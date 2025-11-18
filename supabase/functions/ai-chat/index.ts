import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { makeCorsHeaders } from '../_shared/cors.ts';
import { validateRequest } from './validation.ts';
import { callOpenAI } from './openai.ts';
import { checkRateLimit, getIdentifier } from './rateLimiter.ts';

serve(async (req) => {
  const corsHeaders = makeCorsHeaders(req);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check rate limiting first
    const identifier = getIdentifier(req);
    const rateLimitError = await checkRateLimit(identifier);
    
    if (rateLimitError) {
      console.log("Rate limit exceeded for identifier:", identifier);
      const body = await rateLimitError.text();
      return new Response(body, {
        status: rateLimitError.status,
        headers: corsHeaders
      });
    }

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

    // Fetch active properties from database
    console.log('Fetching active properties...');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data: properties, error: propertiesError } = await supabase
      .from('properties')
      .select('id, title, address, city, state, price, bedrooms, bathrooms, property_type, available_date, description, square_footage, amenities, pet_policy')
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(10);

    if (propertiesError) {
      console.error('Error fetching properties:', propertiesError);
    } else {
      console.log(`Found ${properties?.length || 0} active properties`);
    }

    // Call OpenAI API with property data
    const openAiResult = await callOpenAI(message, conversationHistory, properties || []);
    
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
    
    // Return generic error response without exposing internal details
    return new Response(
      JSON.stringify({ 
        error: "An unexpected error occurred. Please try again."
      }),
      { 
        status: 500, 
        headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" }
      }
    );
  }
});
