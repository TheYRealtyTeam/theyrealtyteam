
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.32.0";

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
    // Create Supabase client
    const url = Deno.env.get("SUPABASE_URL") || "https://axgepdguspqqxudqnobz.supabase.co";
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(url, key);

    // Get the most recent contact submission
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;

    if (!data) {
      return new Response(
        JSON.stringify({ error: "No contact submission found" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        }
      );
    }

    // Here you would typically send an email notification
    // For now, let's just log the data and return a success response
    console.log("New contact form submission:", {
      name: data.name,
      email: data.email,
      phone: data.phone || "Not provided",
      property_type: data.property_type,
      message: data.message,
      created_at: data.created_at,
    });

    // Update the submission status to "notified"
    const { error: updateError } = await supabase
      .from("contact_submissions")
      .update({ status: "notified" })
      .eq("id", data.id);

    if (updateError) throw updateError;

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Contact notification processed",
        recipientEmail: "info@theYteam.co" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing contact notification:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
