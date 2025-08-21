// Server-side security utilities for Supabase Edge Functions

export interface RateLimitEntry {
  count: number;
  resetTime: number;
}

export class EdgeSecurityUtils {
  /**
   * Server-side rate limiting using Supabase
   */
  static async checkRateLimit(
    supabaseClient: any,
    identifier: string,
    maxRequests: number,
    windowMs: number
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    try {
      // Count recent requests from this identifier
      const { data: recentRequests, error } = await supabaseClient
        .from('rate_limit_log')
        .select('*')
        .eq('identifier', identifier)
        .gte('created_at', new Date(windowStart).toISOString())
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Rate limit check error:', error);
        return { allowed: true, remaining: maxRequests, resetTime: now + windowMs };
      }

      const requestCount = recentRequests?.length || 0;
      const allowed = requestCount < maxRequests;
      const remaining = Math.max(0, maxRequests - requestCount - 1);
      
      if (allowed) {
        // Log this request
        await supabaseClient
          .from('rate_limit_log')
          .insert({
            identifier,
            created_at: new Date().toISOString()
          });
      }

      return {
        allowed,
        remaining,
        resetTime: now + windowMs
      };
    } catch (error) {
      console.error('Rate limiting error:', error);
      // Fail open - allow the request if there's an error
      return { allowed: true, remaining: maxRequests, resetTime: now + windowMs };
    }
  }

  /**
   * Enhanced input sanitization for server-side
   */
  static sanitizeServerInput(input: string): string {
    if (!input || typeof input !== 'string') return '';
    
    return input
      .trim()
      // Remove HTML tags and dangerous characters
      .replace(/<[^>]*>/g, '')
      // Remove script-related protocols and events
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/onload=/gi, '')
      .replace(/onerror=/gi, '')
      .replace(/onclick=/gi, '')
      .replace(/onmouseover=/gi, '')
      .replace(/onsubmit=/gi, '')
      .replace(/onfocus=/gi, '')
      .replace(/onblur=/gi, '')
      // Remove SQL injection attempts
      .replace(/('|(\\')|(;)|(%27)|(%3B)|(")|(\\"))/gi, '')
      .replace(/(DROP|DELETE|UPDATE|INSERT|CREATE|ALTER|EXEC|UNION|SELECT)/gi, '')
      // Remove potential script tags in various encodings
      .replace(/(%3C)|(%3E)|(%22)|(%27)|(%2F)|(&lt;)|(&gt;)/gi, '')
      // Remove null bytes and control characters
      .replace(/\0/g, '')
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
      // Remove potential file inclusion attacks
      .replace(/\.\.\//g, '')
      .replace(/\.\.\\/g, '');
  }

  /**
   * Validate email with additional security checks
   */
  static validateSecureEmail(email: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!email || typeof email !== 'string') {
      errors.push('Email is required');
      return { isValid: false, errors };
    }

    const sanitized = this.sanitizeServerInput(email);
    
    // Basic email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(sanitized)) {
      errors.push('Invalid email format');
    }

    // Length validation (RFC 5321)
    if (sanitized.length > 254) {
      errors.push('Email too long');
    }

    // Check for suspicious patterns
    if (sanitized.includes('..') || sanitized.includes('--')) {
      errors.push('Suspicious email pattern detected');
    }

    // Validate domain part
    const domain = sanitized.split('@')[1];
    if (domain && domain.length > 63) {
      errors.push('Domain name too long');
    }

    return { isValid: errors.length === 0, errors };
  }

  /**
   * Create security headers for responses
   */
  static createSecurityHeaders(): Headers {
    const headers = new Headers();
    
    // Prevent XSS attacks
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'DENY');
    headers.set('X-XSS-Protection', '1; mode=block');
    
    // Content Security Policy
    headers.set('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' https:; " +
      "connect-src 'self' https:; " +
      "frame-ancestors 'none';"
    );
    
    // Prevent MIME type sniffing
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // HSTS (if using HTTPS)
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    
    return headers;
  }

  /**
   * Log security events for monitoring
   */
  static async logSecurityEvent(
    supabaseClient: any,
    event: string,
    details: Record<string, any>,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): Promise<void> {
    try {
      await supabaseClient
        .from('security_logs')
        .insert({
          event,
          details,
          severity,
          created_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }
}