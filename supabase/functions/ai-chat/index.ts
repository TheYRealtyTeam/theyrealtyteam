import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate request method
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { 
          status: 405, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Validate content type
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({ error: "Invalid content type. Expected application/json" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Parse and validate request body
    let requestData;
    try {
      requestData = await req.json();
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const { message, conversationHistory } = requestData;

    // Validate message
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Message is required and must be a non-empty string" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Validate message length (prevent abuse)
    if (message.length > 4000) {
      return new Response(
        JSON.stringify({ error: "Message too long. Maximum 4000 characters allowed" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Get and validate OpenAI API key
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      console.error("OpenAI API key not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured. Please contact support." }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Prepare conversation messages with enhanced system prompt
    const messages = [
      {
        role: "system",
        content: `You are the Y Realty Team AI assistant, representing a premium nationwide property management company that delivers exceptional service across all 50 states.

Y Realty Team specializes in comprehensive property management solutions including residential and commercial properties, multi-family units, and mixed-use developments. We provide full-service property management with professional tenant placement and thorough screening processes, expert maintenance coordination and oversight, detailed monthly financial reporting with transparent rent collection, comprehensive market analysis and strategic investment advice, and specialized property investment consulting services.

What sets us apart is that we always have boots on the ground with our own trained Y Realty Team members in every state, ensuring direct oversight and quality control. In addition to our dedicated team members, we work with carefully vetted third-party partners to provide comprehensive local support while maintaining our high standards.

Our commitment extends beyond business hours with 24/7 emergency support for our valued clients, professional property marketing and advertising, and complete eviction services when necessary.

IMPORTANT: When users ask to speak with a person, representative, agent, or any human contact, immediately provide our contact information:

📞 Phone: (845) 734-3331
📧 Email: info@theYteam.co
🌐 Website: theyteam.co

Business Hours: Monday through Friday, 9:00 AM to 6:00 PM
We're closed on weekends, but our clients have access to 24/7 emergency support for urgent property matters.

You can also direct them to our contact page on the website or mention they can schedule an appointment for a consultation.

Your responses should be warm, professional, and conversational. Avoid bullet points, asterisks, or excessive formatting. Write in clear, flowing sentences that are easy to read and reflect our premium brand. Focus on being helpful while maintaining the sophisticated, trustworthy image of Y Realty Team.

For pricing or detailed quotes, guide users to contact us directly for personalized service tailored to their specific property management needs.`
      }
    ];

    // Add conversation history if provided
    if (conversationHistory && Array.isArray(conversationHistory)) {
      // Limit history to last 10 messages to prevent token limit issues
      const recentHistory = conversationHistory.slice(-10);
      messages.push(...recentHistory);
    }

    // Add current user message
    messages.push({
      role: "user",
      content: message.trim()
    });

    console.log("Sending request to OpenAI with", messages.length, "messages");

    // Call OpenAI Chat Completions API
    const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    // Check if OpenAI request was successful
    if (!openAiResponse.ok) {
      const errorText = await openAiResponse.text();
      console.error("OpenAI API error:", openAiResponse.status, errorText);
      
      let errorMessage = "AI service temporarily unavailable. Please try again.";
      
      if (openAiResponse.status === 401) {
        errorMessage = "AI service authentication failed. Please contact support.";
      } else if (openAiResponse.status === 429) {
        errorMessage = "AI service is busy. Please wait a moment and try again.";
      } else if (openAiResponse.status >= 500) {
        errorMessage = "AI service is experiencing issues. Please try again later.";
      }

      return new Response(
        JSON.stringify({ error: errorMessage }),
        { 
          status: 503, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Parse OpenAI response
    let openAiData;
    try {
      openAiData = await openAiResponse.json();
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid response from AI service" }),
        { 
          status: 502, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Validate OpenAI response structure
    if (!openAiData || !openAiData.choices || !Array.isArray(openAiData.choices) || openAiData.choices.length === 0) {
      console.error("Invalid OpenAI response structure:", openAiData);
      return new Response(
        JSON.stringify({ error: "Invalid response from AI service" }),
        { 
          status: 502, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const choice = openAiData.choices[0];
    if (!choice || !choice.message || !choice.message.content) {
      console.error("Invalid choice structure in OpenAI response:", choice);
      return new Response(
        JSON.stringify({ error: "Invalid response from AI service" }),
        { 
          status: 502, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const aiResponse = choice.message.content.trim();

    // Validate response content
    if (!aiResponse) {
      console.error("Empty response from OpenAI");
      return new Response(
        JSON.stringify({ error: "AI service returned empty response" }),
        { 
          status: 502, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("Successfully generated AI response");

    // Return successful response
    return new Response(
      JSON.stringify({ response: aiResponse }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error("Unexpected error in AI chat function:", error);
    
    // Return generic error response
    return new Response(
      JSON.stringify({ 
        error: "An unexpected error occurred. Please try again.",
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
