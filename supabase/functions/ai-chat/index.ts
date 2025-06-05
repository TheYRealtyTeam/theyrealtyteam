
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

    // Prepare conversation messages
    const messages = [
      {
        role: "system",
        content: `You are a helpful AI assistant for Y Realty Team, a premium property management company that operates nationwide across all 50 states. You specialize in:

- Residential and commercial property management
- Tenant placement and screening
- Maintenance coordination and oversight
- Financial reporting and rent collection
- Market analysis and investment advice
- Property investment strategies
- Real estate market insights

Key services include:
- Full-service property management
- Tenant screening and placement
- 24/7 maintenance coordination
- Monthly financial reporting
- Market rent analysis
- Property investment consulting
- Eviction services when necessary
- Property marketing and advertising

You should be helpful, professional, and knowledgeable about property management topics. If asked about specific pricing or detailed quotes, direct users to contact Y Realty Team directly for personalized service. Keep responses concise but informative.`
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
