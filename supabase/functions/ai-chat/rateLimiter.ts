import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Rate limit configuration
const RATE_LIMIT = {
  MAX_REQUESTS: 15, // 15 requests per hour per user
  WINDOW_MS: 60 * 60 * 1000, // 1 hour in milliseconds
};

const createErrorResponse = (error: string, status: number) => {
  return new Response(
    JSON.stringify({ error }),
    { 
      status,
      headers: { "Content-Type": "application/json" }
    }
  );
};

export const checkRateLimit = async (identifier: string): Promise<Response | null> => {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Get current rate limit record
    const { data: existingLimit, error: fetchError } = await supabase
      .from('ai_chat_rate_limits')
      .select('*')
      .eq('identifier', identifier)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching rate limit:', fetchError);
      // Don't block on database errors, but log them
      return null;
    }

    const now = new Date();
    
    if (!existingLimit) {
      // First request from this identifier - create new record
      const { error: insertError } = await supabase
        .from('ai_chat_rate_limits')
        .insert({
          identifier,
          request_count: 1,
          window_start: now.toISOString(),
          last_request_at: now.toISOString()
        });

      if (insertError) {
        console.error('Error inserting rate limit:', insertError);
      }
      
      return null; // Allow request
    }

    // Check if window has expired
    const windowStart = new Date(existingLimit.window_start);
    const windowEnd = new Date(windowStart.getTime() + RATE_LIMIT.WINDOW_MS);

    if (now > windowEnd) {
      // Window expired - reset counter
      const { error: updateError } = await supabase
        .from('ai_chat_rate_limits')
        .update({
          request_count: 1,
          window_start: now.toISOString(),
          last_request_at: now.toISOString()
        })
        .eq('identifier', identifier);

      if (updateError) {
        console.error('Error resetting rate limit:', updateError);
      }
      
      return null; // Allow request
    }

    // Window is still active - check if limit exceeded
    if (existingLimit.request_count >= RATE_LIMIT.MAX_REQUESTS) {
      const timeRemaining = Math.ceil((windowEnd.getTime() - now.getTime()) / 1000 / 60);
      
      console.log(`Rate limit exceeded for ${identifier}. Requests: ${existingLimit.request_count}/${RATE_LIMIT.MAX_REQUESTS}`);
      
      return createErrorResponse(
        `Rate limit exceeded. You can make ${RATE_LIMIT.MAX_REQUESTS} requests per hour. Please try again in ${timeRemaining} minutes.`,
        429
      );
    }

    // Increment counter
    const { error: incrementError } = await supabase
      .from('ai_chat_rate_limits')
      .update({
        request_count: existingLimit.request_count + 1,
        last_request_at: now.toISOString()
      })
      .eq('identifier', identifier);

    if (incrementError) {
      console.error('Error incrementing rate limit:', incrementError);
    }

    return null; // Allow request
    
  } catch (error) {
    console.error('Unexpected error in rate limiter:', error);
    // Don't block requests on unexpected errors
    return null;
  }
};

// Helper to get identifier from request (IP address or user ID)
export const getIdentifier = (req: Request): string => {
  // Try to get from various headers
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  
  // Use the first available IP address
  const ip = forwardedFor?.split(',')[0]?.trim() || 
             realIp || 
             cfConnectingIp || 
             'unknown';
  
  return `ip:${ip}`;
};
