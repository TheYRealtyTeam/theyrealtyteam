/**
 * Blog Post Content Sanitization
 * 
 * Provides secure sanitization for blog post content to prevent XSS attacks
 * while allowing safe HTML formatting for blog posts.
 */

export class BlogSanitizer {
  /**
   * Sanitize blog post text content
   * Removes dangerous scripts and event handlers while preserving basic formatting
   */
  static sanitizeText(text: string): string {
    if (!text || typeof text !== 'string') return '';
    
    return text
      .trim()
      // Remove script tags and content
      .replace(/<script[^>]*>.*?<\/script>/gis, '')
      // Remove event handlers
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/on\w+\s*=\s*[^\s>]*/gi, '')
      // Remove javascript: and data: protocols
      .replace(/javascript:/gi, '')
      .replace(/data:text\/html/gi, '')
      // Remove dangerous iframe attempts
      .replace(/<iframe[^>]*>.*?<\/iframe>/gis, '')
      // Remove object and embed tags
      .replace(/<object[^>]*>.*?<\/object>/gis, '')
      .replace(/<embed[^>]*>/gi, '')
      // Remove dangerous style attributes that could exfiltrate data
      .replace(/style\s*=\s*["'][^"']*expression[^"']*["']/gi, '')
      .replace(/style\s*=\s*["'][^"']*behavior[^"']*["']/gi, '');
  }

  /**
   * Validate and sanitize a complete blog post
   */
  static sanitizeBlogPost(post: {
    title: string;
    excerpt: string;
    content: string;
    category?: string;
  }): {
    title: string;
    excerpt: string;
    content: string;
    category?: string;
  } {
    return {
      title: this.sanitizeText(post.title),
      excerpt: this.sanitizeText(post.excerpt),
      content: this.sanitizeText(post.content),
      category: post.category ? this.sanitizeText(post.category) : undefined
    };
  }

  /**
   * Validate blog post lengths
   */
  static validateLengths(post: {
    title: string;
    excerpt: string;
    content: string;
  }): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (post.title.length > 200) {
      errors.push('Title must be less than 200 characters');
    }
    if (post.excerpt.length > 500) {
      errors.push('Excerpt must be less than 500 characters');
    }
    if (post.content.length > 50000) {
      errors.push('Content must be less than 50,000 characters');
    }
    if (post.title.length < 5) {
      errors.push('Title must be at least 5 characters');
    }
    if (post.excerpt.length < 10) {
      errors.push('Excerpt must be at least 10 characters');
    }
    if (post.content.length < 50) {
      errors.push('Content must be at least 50 characters');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}
