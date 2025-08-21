// Security utilities for the application

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  keyPrefix: string;
}

export class SecurityUtils {
  // Rate limiting storage (in-memory for client-side)
  private static rateLimitStore = new Map<string, { count: number; resetTime: number }>();

  /**
   * Client-side rate limiting check
   */
  static checkRateLimit(identifier: string, config: RateLimitConfig): boolean {
    const key = `${config.keyPrefix}:${identifier}`;
    const now = Date.now();
    const existing = this.rateLimitStore.get(key);

    if (!existing || now > existing.resetTime) {
      // Reset or create new entry
      this.rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs
      });
      return true;
    }

    if (existing.count >= config.maxRequests) {
      return false; // Rate limit exceeded
    }

    // Increment counter
    existing.count++;
    this.rateLimitStore.set(key, existing);
    return true;
  }

  /**
   * Clean expired rate limit entries
   */
  static cleanExpiredEntries(): void {
    const now = Date.now();
    for (const [key, value] of this.rateLimitStore.entries()) {
      if (now > value.resetTime) {
        this.rateLimitStore.delete(key);
      }
    }
  }

  /**
   * Advanced input validation with security checks
   */
  static validateSecureInput(input: string, options: {
    maxLength?: number;
    allowHtml?: boolean;
    allowSpecialChars?: boolean;
  } = {}): { isValid: boolean; sanitized: string; errors: string[] } {
    const errors: string[] = [];
    let sanitized = input.trim();

    // Length check
    if (options.maxLength && sanitized.length > options.maxLength) {
      errors.push(`Input exceeds maximum length of ${options.maxLength} characters`);
      sanitized = sanitized.substring(0, options.maxLength);
    }

    // HTML check
    if (!options.allowHtml && /<[^>]*>/g.test(sanitized)) {
      errors.push('HTML tags are not allowed');
      sanitized = sanitized.replace(/<[^>]*>/g, '');
    }

    // Special characters check
    if (!options.allowSpecialChars && /[<>'"&%]/.test(sanitized)) {
      errors.push('Special characters are not allowed');
      sanitized = sanitized.replace(/[<>'"&%]/g, '');
    }

    // Check for script injection attempts
    const scriptPatterns = [
      /javascript:/gi,
      /data:/gi,
      /vbscript:/gi,
      /onload=/gi,
      /onerror=/gi,
      /onclick=/gi,
      /onmouseover=/gi,
      /script/gi,
      /iframe/gi,
      /object/gi,
      /embed/gi
    ];

    for (const pattern of scriptPatterns) {
      if (pattern.test(sanitized)) {
        errors.push('Potentially malicious content detected');
        sanitized = sanitized.replace(pattern, '');
      }
    }

    return {
      isValid: errors.length === 0,
      sanitized,
      errors
    };
  }

  /**
   * Generate a secure session token
   */
  static generateSecureToken(length: number = 32): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      // Use cryptographically secure random numbers in browser
      const array = new Uint8Array(length);
      window.crypto.getRandomValues(array);
      
      for (let i = 0; i < length; i++) {
        result += characters.charAt(array[i] % characters.length);
      }
    } else {
      // Fallback for non-browser environments
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    }
    
    return result;
  }

  /**
   * Hash sensitive data (client-side hashing for additional security)
   */
  static async hashSensitiveData(data: string): Promise<string> {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    // Fallback - not cryptographically secure but better than nothing
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  }
}

// Rate limiting configurations
export const RATE_LIMITS = {
  CONTACT_FORM: {
    maxRequests: 3,
    windowMs: 15 * 60 * 1000, // 15 minutes
    keyPrefix: 'contact'
  },
  APPOINTMENT_BOOKING: {
    maxRequests: 5,
    windowMs: 30 * 60 * 1000, // 30 minutes
    keyPrefix: 'appointment'
  },
  GENERAL_API: {
    maxRequests: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
    keyPrefix: 'api'
  }
} as const;

// Clean up rate limit entries every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    SecurityUtils.cleanExpiredEntries();
  }, 5 * 60 * 1000);
}