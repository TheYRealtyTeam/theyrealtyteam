import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@2.0.0";

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://theYteam.co https://www.theYteam.co http://localhost:3000',
  'Vary': 'Origin',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

// Security utilities
class EdgeSecurityUtils {
  static async checkRateLimit(
    supabaseClient: any,
    identifier: string,
    maxRequests: number,
    windowMs: number
  ): Promise<{ allowed: boolean; remaining: number }> {
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

      return { allowed, remaining: Math.max(0, maxRequests - requestCount - 1) };
    } catch (error) {
      console.error('Rate limiting error:', error);
      return { allowed: true, remaining: maxRequests };
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

// Handle CORS preflight requests
const handleCors = (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
};

// Initialize Supabase and Resend clients
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const resend = new Resend(Deno.env.get('RESEND_API_KEY') ?? '');
const FROM = Deno.env.get('RESEND_FROM') ?? 'Y Realty Team <no-reply@theYteam.co>';

interface ContactSubmissionData {
  name: string;
  email: string;
  phone?: string;
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
      to: ['info@theYteam.co'],
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
  // Handle CORS preflight requests
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    console.log('Processing contact form submission...');
    
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    // Rate limiting - 3 requests per 15 minutes per IP
    const rateLimit = await EdgeSecurityUtils.checkRateLimit(
      supabase, 
      `contact-${clientIP}`, 
      3, 
      15 * 60 * 1000 // 15 minutes
    );
    
    if (!rateLimit.allowed) {
      await EdgeSecurityUtils.logSecurityEvent(
        supabase,
        'rate_limit_exceeded',
        { ip: clientIP, endpoint: 'contact-notification' },
        'medium'
      );
      
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please wait before submitting again.',
          remaining: rateLimit.remaining 
        }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'X-RateLimit-Remaining': rateLimit.remaining.toString() } 
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
        { status: 400, headers: corsHeaders }
      );
    }

    const { name, email, property_type, message, phone } = requestData;

    // Validate required fields
    if (!name || !email || !property_type || !message) {
      await EdgeSecurityUtils.logSecurityEvent(
        supabase,
        'invalid_contact_submission',
        { ip: clientIP, missing_fields: { name: !name, email: !email, property_type: !property_type, message: !message } },
        'low'
      );
      
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email, property_type, and message are required' }),
        { status: 400, headers: corsHeaders }
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
        { status: 500, headers: corsHeaders }
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
        message: 'Contact form submitted successfully',
        data: data,
        email_sent: emailResult.success,
        recipientEmail: 'info@theYteam.co'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'X-RateLimit-Remaining': rateLimit.remaining.toString() } 
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
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: corsHeaders }
    );
  }
});