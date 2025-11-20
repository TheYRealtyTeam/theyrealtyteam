import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { makeCorsHeaders } from '../_shared/cors.ts';
import { verifyRecaptcha } from '../_shared/recaptcha.ts';

// Security utilities
class EdgeSecurityUtils {
  static async checkRateLimit(
    supabaseClient: any,
    identifier: string,
    maxRequests: number,
    windowMs: number
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    try {
      const { data: recentRequests } = await supabaseClient
        .from('rate_limit_log')
        .select('*')
        .eq('identifier', identifier)
        .gte('created_at', new Date(windowStart).toISOString());

      const requestCount = recentRequests?.length || 0;
      const allowed = requestCount < maxRequests;
      
      if (allowed) {
        await supabaseClient
          .from('rate_limit_log')
          .insert({ identifier, created_at: new Date().toISOString() });
      }

      return { 
        allowed, 
        remaining: Math.max(0, maxRequests - requestCount - 1),
        resetTime: windowStart + windowMs
      };
    } catch (error) {
      console.error('Rate limiting error:', error);
      return { allowed: true, remaining: maxRequests, resetTime: now + windowMs };
    }
  }

  static sanitizeInput(input: string): string {
    if (!input || typeof input !== 'string') return '';
    
    return input
      .trim()
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/onload=/gi, '')
      .replace(/onerror=/gi, '')
      .replace(/onclick=/gi, '')
      .replace(/onmouseover=/gi, '')
      .replace(/('|(\\')|(;)|(%27)|(%3B)|(")|(\\"))/gi, '')
      .replace(/(%3C)|(%3E)|(%22)|(%27)|(%2F)/gi, '')
      .replace(/\0/g, '')
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  }

  static async logSecurityEvent(
    supabaseClient: any,
    event: string,
    details: Record<string, any>,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): Promise<void> {
    try {
      await supabaseClient
        .from('security_logs')
        .insert({
          event,
          details,
          severity,
          created_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }
}

// Initialize Supabase and Resend clients
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const resend = new Resend(Deno.env.get('RESEND_API_KEY') ?? '');
const FROM = Deno.env.get('RESEND_FROM') ?? 'Y Realty Team <no-reply@theyteam.co>';

interface ContactSubmissionData {
  name: string;
  email: string;
  phone?: string | null;
  property_type: string;
  message: string;
}

// Utility function to sanitize input
function sanitizeInput(input: string): string {
  return EdgeSecurityUtils.sanitizeInput(input);
}

// Send email notification
async function sendEmailNotification(submissionData: ContactSubmissionData) {
  if (!Deno.env.get('RESEND_API_KEY')) {
    console.log('No Resend API key configured, skipping email notification');
    return { success: false, reason: 'No API key' };
  }

  const sanitizedData = {
    name: sanitizeInput(submissionData.name),
    email: sanitizeInput(submissionData.email),
    phone: submissionData.phone ? sanitizeInput(submissionData.phone) : 'Not provided',
    property_type: sanitizeInput(submissionData.property_type),
    message: sanitizeInput(submissionData.message)
  };

  const htmlBody = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${sanitizedData.name}</p>
    <p><strong>Email:</strong> ${sanitizedData.email}</p>
    <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
    <p><strong>Property Type:</strong> ${sanitizedData.property_type}</p>
    <p><strong>Message:</strong></p>
    <p>${sanitizedData.message}</p>
    <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: ['info@theyteam.co'],
      subject: `New Contact Form Submission from ${sanitizedData.name}`,
      html: htmlBody,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
}

serve(async (req) => {
  const corsHeaders = makeCorsHeaders(req);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Processing contact form submission...');
    
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    // Rate limiting - 3 requests per 15 minutes per IP
    const rateLimitCheck = await EdgeSecurityUtils.checkRateLimit(
      supabase, 
      `contact-${clientIP}`, 
      3, 
      15 * 60 * 1000 // 15 minutes
    );
    
    if (!rateLimitCheck.allowed) {
      await EdgeSecurityUtils.logSecurityEvent(
        supabase,
        'rate_limit_exceeded',
        { ip: clientIP, endpoint: 'contact-notification' },
        'medium'
      );
      
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later.',
          resetTime: new Date(rateLimitCheck.resetTime).toISOString()
        }),
        { 
          status: 429, 
          headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" }
        }
      );
    }

    // Parse request body
    let requestData: ContactSubmissionData;
    try {
      requestData = await req.json();
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { 
          status: 400, 
          headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" }
        }
      );
    }

    const { name, email, property_type, message, phone, honeypot, recaptchaToken } = requestData;

    // Verify reCAPTCHA token
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      await EdgeSecurityUtils.logSecurityEvent(
        supabase,
        'recaptcha_verification_failed',
        { ip: clientIP },
        'high'
      );
      return new Response(
        JSON.stringify({ error: 'reCAPTCHA verification failed' }),
        { status: 403, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
      );
    }

    // Honeypot field check - if filled, it's likely a bot
    if (honeypot) {
      await EdgeSecurityUtils.logSecurityEvent(
        supabase,
        'bot_detected_honeypot',
        { ip: clientIP },
        'medium'
      );
      
      // Return success to not alert the bot
      return new Response(
        JSON.stringify({ success: true, message: "Contact form submitted successfully" }),
        { status: 200, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
      );
    }

    // Validate required fields
    const errors: string[] = [];
    if (!name) errors.push('name');
    if (!email) errors.push('email');
    if (!property_type) errors.push('property_type');
    if (!message) errors.push('message');

    if (errors.length > 0) {
      await EdgeSecurityUtils.logSecurityEvent(
        supabase,
        'invalid_contact_submission',
        { ip: clientIP, missing_fields: errors },
        'low'
      );
      
      return new Response(
        JSON.stringify({ error: "Invalid request data", details: errors }),
        { 
          status: 400, 
          headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" }
        }
      );
    }

    // Sanitize input data
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : null,
      property_type: sanitizeInput(property_type),
      message: sanitizeInput(message)
    };

    console.log('Sanitized submission data:', { 
      ...sanitizedData, 
      email: sanitizedData.email.substring(0, 3) + '***' 
    });

    // Insert the sanitized data into Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert(sanitizedData)
      .select();

    if (error) {
      console.error('Supabase insertion error:', error);
      
      await EdgeSecurityUtils.logSecurityEvent(
        supabase,
        'database_error',
        { ip: clientIP, error: error.message },
        'high'
      );
      
      return new Response(
        JSON.stringify({ error: 'Failed to save contact submission' }),
        { 
          status: 500, 
          headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" }
        }
      );
    }

    console.log('Contact submission saved to database:', data);

    // Send email notification if Resend API key is configured
    const emailResult = await sendEmailNotification(sanitizedData);
    
    // Log successful submission
    await EdgeSecurityUtils.logSecurityEvent(
      supabase,
      'contact_form_submitted',
      { 
        ip: clientIP, 
        email_sent: emailResult.success, 
        submission_id: data[0]?.id 
      },
      'low'
    );

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Contact form submitted successfully" 
      }),
      {
        status: 200,
        headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    
    // Log critical error
    await EdgeSecurityUtils.logSecurityEvent(
      supabase,
      'unexpected_error',
      { error: error instanceof Error ? error.message : 'Unknown error' },
      'critical'
    );
    
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" },
      }
    );
  }
});
