
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Handle CORS preflight requests
function handleCors(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }
}

// Initialize Supabase client with environment variables
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(resendApiKey);

// Input sanitization function
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

// Function to send an email notification using Resend
async function sendEmailNotification(submissionData: any) {
  const recipientEmail = "info@theYteam.co";
  const subject = `New Contact Form Submission from ${submissionData.name}`;
  
  // Create HTML email body with submission details
  const htmlBody = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${submissionData.name}</p>
    <p><strong>Email:</strong> ${submissionData.email}</p>
    <p><strong>Phone:</strong> ${submissionData.phone || "Not provided"}</p>
    <p><strong>Property Type:</strong> ${submissionData.property_type}</p>
    <p><strong>Message:</strong></p>
    <p>${submissionData.message}</p>
    <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
  `;
  
  try {
    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Y Realty Team <no-reply@theYteam.co>",
      to: [recipientEmail],
      subject,
      html: htmlBody,
    });
    
    console.log("Email notification sent successfully:", emailResponse);
    return { success: true, data: emailResponse };
  } catch (error) {
    console.error("Failed to send email notification:", error);
    return { success: false, error: error.message };
  }
}

serve(async (req) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Get the form data from the request
    const formData = await req.json();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.property_type || !formData.message) {
      throw new Error("Missing required fields");
    }

    // Sanitize inputs
    const submissionData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: formData.phone ? sanitizeInput(formData.phone) : null,
      property_type: sanitizeInput(formData.property_type),
      message: sanitizeInput(formData.message),
      created_at: new Date().toISOString(),
    };

    console.log("Contact form submission received:", submissionData);

    // Store the submission in Supabase
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([submissionData])
      .select();

    if (error) {
      console.error("Error storing contact submission:", error);
      throw new Error("Failed to store contact submission");
    }

    // Send email notification if Resend API key is available
    let emailResult = { success: false, error: "Resend API key not configured" };
    if (resendApiKey) {
      emailResult = await sendEmailNotification(submissionData);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Contact message received and stored",
        emailSent: emailResult.success,
        data: data,
        recipientEmail: "info@theYteam.co" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "Internal server error",
        success: false 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
