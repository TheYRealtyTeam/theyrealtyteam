import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { makeCorsHeaders } from '../_shared/cors.ts';
import { validateRequest } from './validation.ts';
import { callOpenAI } from './openai.ts';

serve(async (req) => {
  const corsHeaders = makeCorsHeaders(req);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate request and parse data
    const validationResult = await validateRequest(req);
    
    // If validation failed, return the error response
    if (validationResult instanceof Response) {
      const body = await validationResult.text();
      return new Response(body, {
        status: validationResult.status,
        headers: corsHeaders
      });
    }

    const { message, conversationHistory } = validationResult;

    // Call OpenAI API
    const openAiResult = await callOpenAI(message, conversationHistory);
    
    // If OpenAI call failed, return the error response
    if (openAiResult instanceof Response) {
      const body = await openAiResult.text();
      return new Response(body, {
        status: openAiResult.status,
        headers: corsHeaders
      });
    }

    // Return successful response
    return new Response(
      JSON.stringify({ response: openAiResult }),
      {
        status: 200,
        headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error("Unexpected error in AI chat function:", error);
    
    // Return generic error response
    return new Response(
      JSON.stringify({ 
        error: "An unexpected error occurred. Please try again.",
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" }
      }
    );
  }
});
