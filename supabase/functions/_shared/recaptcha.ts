/**
 * Verify reCAPTCHA v3 token
 * Returns true if valid or if running in development mode
 */
export async function verifyRecaptcha(token: string | null | undefined): Promise<boolean> {
  // Skip verification in development
  if (!Deno.env.get('VITE_RECAPTCHA_SITE_KEY')) {
    return true;
  }

  // No token provided
  if (!token) {
    return false;
  }

  const secretKey = Deno.env.get('RECAPTCHA_SECRET_KEY');
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY not configured');
    return true; // Allow submission if not configured to avoid blocking users
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    
    // Check if verification was successful and score is acceptable (>= 0.5)
    return data.success && (!data.score || data.score >= 0.5);
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return true; // Allow submission if verification fails to avoid blocking users
  }
}
