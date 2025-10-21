
import { supabase } from '@/integrations/supabase/client';

// Microsoft Graph API constants
const MS_AUTH_ENDPOINT = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
const MS_TOKEN_ENDPOINT = 'https://login.microsoftonline.com/common/oauth2/v2.0/token';
const REDIRECT_URI = window.location.origin + '/auth/callback';

// These scopes are required for calendar access
const SCOPES = [
  'Calendars.ReadWrite',
  'offline_access',
];

// Replace with your application's client ID from Microsoft Azure portal
// NOTE: This is a PUBLIC identifier used in OAuth2 flows - not a secret
// To enable Microsoft calendar integration:
// 1. Register an app at: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps
// 2. Configure redirect URI to match REDIRECT_URI below
// 3. Replace 'YOUR_CLIENT_ID' with your actual client ID
const CLIENT_ID = 'YOUR_CLIENT_ID';

// Validate CLIENT_ID configuration
const isMicrosoftConfigured = (): boolean => {
  if (CLIENT_ID === 'YOUR_CLIENT_ID' || !CLIENT_ID) {
    console.warn('Microsoft Graph API not configured. Calendar integration will not work.');
    return false;
  }
  return true;
}

// Helper function to call the secure edge function
async function callMicrosoftGraphProxy(action: string, data: any) {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error('User not authenticated');
  }

  const { data: result, error } = await supabase.functions.invoke('microsoft-graph-proxy', {
    body: { action, data },
  });

  if (error) throw error;
  return result;
}

export const microsoftGraphApi = {
  /**
   * Initialize Microsoft authentication - check if user has stored tokens server-side
   */
  async init() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      // Check if user has tokens stored in database
      const { data: tokenRow, error } = await supabase
        .from('microsoft_tokens')
        .select('expires_at')
        .eq('user_id', user.id)
        .single();

      if (error || !tokenRow) return false;

      const expiresAt = new Date(tokenRow.expires_at);
      return expiresAt > new Date();
    } catch (e) {
      console.error('Error checking token:', e);
      return false;
    }
  },

  /**
   * Start the OAuth flow
   */
  startAuth() {
    // Validate configuration before attempting authentication
    if (!isMicrosoftConfigured()) {
      throw new Error('Microsoft Graph API client ID not configured. Please configure CLIENT_ID in graphApiClient.ts');
    }

    // Store the current URL to redirect back after auth
    localStorage.setItem('ms_auth_redirect', window.location.pathname);
    
    // Build the authorization URL
    const authUrl = new URL(MS_AUTH_ENDPOINT);
    authUrl.searchParams.append('client_id', CLIENT_ID);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.append('scope', SCOPES.join(' '));
    authUrl.searchParams.append('response_mode', 'query');
    
    // Redirect to Microsoft login
    window.location.href = authUrl.toString();
  },

  /**
   * Handle the authentication callback - securely store tokens server-side
   * @param code Authorization code from Microsoft
   */
  async handleAuthCallback(code: string): Promise<boolean> {
    try {
      // Validate configuration
      if (!isMicrosoftConfigured()) {
        console.error('Microsoft Graph API not configured');
        return false;
      }

      // Exchange code for token
      const tokenResponse = await fetch(MS_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to exchange code for token');
      }

      const tokenData = await tokenResponse.json();
      
      // Calculate expiration time
      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + tokenData.expires_in);
      
      // Store token securely on server via edge function
      await callMicrosoftGraphProxy('store_token', {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt: expiresAt.toISOString(),
      });
      
      return true;
    } catch (error) {
      console.error('Error handling auth callback:', error);
      return false;
    }
  },

  /**
   * Create a calendar event for the appointment
   * @param appointmentDetails The appointment details
   */
  async createCalendarEvent(appointmentDetails: {
    date: string;
    time: string;
    callType: string;
    name: string;
    message?: string;
  }): Promise<{success: boolean, eventId?: string, error?: string}> {
    try {
      // Validate configuration
      if (!isMicrosoftConfigured()) {
        return { success: false, error: 'not_configured' };
      }

      // Check if user is authenticated
      if (!this.init()) {
        return { success: false, error: 'not_authenticated' };
      }

      // Parse the date and time
      const dateStr = appointmentDetails.date;
      const timeStr = appointmentDetails.time;
      
      // For dates formatted like "May 18, 2025"
      let startDate: Date;
      let endDate: Date;
      
      try {
        // Try to parse the date
        if (dateStr.includes(',')) {
          // Format like "May 18, 2025"
          const dateParts = dateStr.match(/([A-Za-z]+) (\d+), (\d+)/);
          if (!dateParts) {
            throw new Error("Invalid date format");
          }
          
          const months: Record<string, number> = {
            'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
            'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
          };
          
          const month = months[dateParts[1] as keyof typeof months];
          const day = parseInt(dateParts[2], 10);
          const year = parseInt(dateParts[3], 10);
          
          // Parse the time (assumes format like "10:00 AM")
          const timeParts = timeStr.match(/(\d+):(\d+) ([AP]M)/);
          if (!timeParts) {
            throw new Error("Invalid time format");
          }
          
          let hour = parseInt(timeParts[1], 10);
          const minute = parseInt(timeParts[2], 10);
          const ampm = timeParts[3];
          
          // Convert from 12-hour to 24-hour format
          if (ampm === "PM" && hour < 12) hour += 12;
          if (ampm === "AM" && hour === 12) hour = 0;
          
          startDate = new Date(year, month, day, hour, minute);
          // Set end time to 1 hour later
          endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
        } else {
          throw new Error("Unrecognized date format");
        }
      } catch (error) {
        console.error("Date parsing error:", error);
        return { success: false, error: 'date_parse_error' };
      }
      
      // Format for Microsoft Graph API (ISO string format)
      const startTime = startDate.toISOString();
      const endTime = endDate.toISOString();
      
      // Create the event data
      const eventData = {
        subject: `Y Realty Team ${appointmentDetails.callType.charAt(0).toUpperCase() + appointmentDetails.callType.slice(1)} Call with ${appointmentDetails.name}`,
        body: {
          contentType: 'HTML',
          content: `
            <p>Property Management Consultation with Y Realty Team</p>
            <p>Call Type: ${appointmentDetails.callType}</p>
            ${appointmentDetails.message ? `<p>Additional Information: ${appointmentDetails.message}</p>` : ''}
          `,
        },
        start: {
          dateTime: startTime,
          timeZone: 'UTC',
        },
        end: {
          dateTime: endTime,
          timeZone: 'UTC',
        },
        isOnlineMeeting: appointmentDetails.callType === 'video',
        onlineMeetingProvider: appointmentDetails.callType === 'video' ? 'teamsForBusiness' : 'unknown',
      };
      
      // Call secure edge function to create event
      const result = await callMicrosoftGraphProxy('create_event', {
        clientId: CLIENT_ID,
        redirectUri: REDIRECT_URI,
        eventData,
      });

      if (result.error) {
        return { success: false, error: result.error };
      }

      return {
        success: true,
        eventId: result.eventId,
      };
    } catch (error) {
      console.error('Error creating calendar event:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'unknown_error' 
      };
    }
  },

  /**
   * Check availability for a specific date and time
   * @param date Date to check
   * @param timeSlot Time slot to check
   */
  async checkAvailability(date: Date, timeSlot: string): Promise<boolean> {
    try {
      // Validate configuration
      if (!isMicrosoftConfigured()) {
        return false;
      }

      // Check if user is authenticated
      if (!this.init()) {
        return false;
      }
      
      // Parse the time slot
      const timeParts = timeSlot.match(/(\d+):(\d+) ([AP]M)/);
      if (!timeParts) {
        throw new Error("Invalid time format");
      }
      
      let hour = parseInt(timeParts[1], 10);
      const minute = parseInt(timeParts[2], 10);
      const ampm = timeParts[3];
      
      // Convert from 12-hour to 24-hour format
      if (ampm === "PM" && hour < 12) hour += 12;
      if (ampm === "AM" && hour === 12) hour = 0;
      
      // Create start and end times for the time slot
      const startTime = new Date(date);
      startTime.setHours(hour, minute, 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 1);
      
      // Format for Microsoft Graph API
      const startTimeStr = startTime.toISOString();
      const endTimeStr = endTime.toISOString();
      
      // Call secure edge function to check availability
      const result = await callMicrosoftGraphProxy('check_availability', {
        clientId: CLIENT_ID,
        redirectUri: REDIRECT_URI,
        startTime: startTimeStr,
        endTime: endTimeStr,
      });

      return result.available;
    } catch (error) {
      console.error('Error checking availability:', error);
      return false;
    }
  },

  /**
   * Log out and clear Microsoft Graph tokens
   */
  async logout() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Delete tokens from database
        await supabase
          .from('microsoft_tokens')
          .delete()
          .eq('user_id', user.id);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },
};
