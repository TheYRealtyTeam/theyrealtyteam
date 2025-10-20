import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { makeCorsHeaders } from '../_shared/cors.ts';

const MS_GRAPH_API_ENDPOINT = 'https://graph.microsoft.com/v1.0';
const MS_TOKEN_ENDPOINT = 'https://login.microsoftonline.com/common/oauth2/v2.0/token';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

interface TokenData {
  access_token: string;
  refresh_token: string;
  expires_at: string;
}

/**
 * Refresh an expired access token
 */
async function refreshAccessToken(refreshToken: string, clientId: string, redirectUri: string): Promise<TokenData | null> {
  try {
    const response = await fetch(MS_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        redirect_uri: redirectUri,
      }),
    });

    if (!response.ok) {
      console.error('Token refresh failed:', response.status);
      return null;
    }

    const data = await response.json();
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + data.expires_in);

    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token || refreshToken,
      expires_at: expiresAt.toISOString(),
    };
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

/**
 * Get valid access token for user (refresh if needed)
 */
async function getValidToken(userId: string, clientId: string, redirectUri: string): Promise<string | null> {
  // Get token from database
  const { data: tokenRow, error } = await supabase
    .from('microsoft_tokens')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error || !tokenRow) {
    console.error('No token found for user:', userId);
    return null;
  }

  const expiresAt = new Date(tokenRow.expires_at);
  const now = new Date();

  // If token is still valid, return it
  if (expiresAt > now) {
    return tokenRow.access_token;
  }

  // Token expired, refresh it
  console.log('Token expired, refreshing...');
  const newTokenData = await refreshAccessToken(tokenRow.refresh_token, clientId, redirectUri);

  if (!newTokenData) {
    console.error('Failed to refresh token');
    return null;
  }

  // Update token in database
  const { error: updateError } = await supabase
    .from('microsoft_tokens')
    .update({
      access_token: newTokenData.access_token,
      refresh_token: newTokenData.refresh_token,
      expires_at: newTokenData.expires_at,
    })
    .eq('user_id', userId);

  if (updateError) {
    console.error('Failed to update token:', updateError);
  }

  return newTokenData.access_token;
}

serve(async (req) => {
  const corsHeaders = makeCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get JWT from Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
      );
    }

    // Verify JWT and get user
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
      );
    }

    const { action, data } = await req.json();

    // Handle different Microsoft Graph API actions
    switch (action) {
      case 'create_event': {
        const { clientId, redirectUri, eventData } = data;
        
        const accessToken = await getValidToken(user.id, clientId, redirectUri);
        if (!accessToken) {
          return new Response(
            JSON.stringify({ error: 'Failed to get valid access token' }),
            { status: 401, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
          );
        }

        // Call Microsoft Graph API to create event
        const response = await fetch(`${MS_GRAPH_API_ENDPOINT}/me/events`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Microsoft Graph API error:', response.status, errorText);
          return new Response(
            JSON.stringify({ error: 'Failed to create calendar event' }),
            { status: response.status, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
          );
        }

        const eventResponse = await response.json();
        return new Response(
          JSON.stringify({ success: true, eventId: eventResponse.id }),
          { status: 200, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
        );
      }

      case 'check_availability': {
        const { clientId, redirectUri, startTime, endTime } = data;
        
        const accessToken = await getValidToken(user.id, clientId, redirectUri);
        if (!accessToken) {
          return new Response(
            JSON.stringify({ error: 'Failed to get valid access token' }),
            { status: 401, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
          );
        }

        // Call Microsoft Graph API to check calendar
        const response = await fetch(
          `${MS_GRAPH_API_ENDPOINT}/me/calendar/calendarView?startDateTime=${startTime}&endDateTime=${endTime}`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          return new Response(
            JSON.stringify({ error: 'Failed to check availability' }),
            { status: response.status, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
          );
        }

        const calendarData = await response.json();
        const isAvailable = calendarData.value.length === 0;

        return new Response(
          JSON.stringify({ available: isAvailable }),
          { status: 200, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
        );
      }

      case 'store_token': {
        const { accessToken, refreshToken, expiresAt } = data;

        // Store or update token in database
        const { error: upsertError } = await supabase
          .from('microsoft_tokens')
          .upsert({
            user_id: user.id,
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_at: expiresAt,
          });

        if (upsertError) {
          console.error('Failed to store token:', upsertError);
          return new Response(
            JSON.stringify({ error: 'Failed to store token' }),
            { status: 500, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ success: true }),
          { status: 200, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Unknown action' }),
          { status: 400, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
        );
    }
  } catch (error) {
    console.error('Error in microsoft-graph-proxy:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
    );
  }
});
