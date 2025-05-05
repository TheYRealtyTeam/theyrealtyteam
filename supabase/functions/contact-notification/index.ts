
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

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

serve(async (req) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Get the form data from the request
    const formData = await req.json();

    // Log the received form data
    console.log("Contact form submission received:", {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "Not provided",
      property_type: formData.property_type,
      message: formData.message,
      timestamp: new Date().toISOString(),
    });

    // In a real implementation, you would send an email to info@theYteam.co
    // For now, we're just logging the data
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Contact message received",
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
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
