
// Enhanced input sanitization function with comprehensive XSS protection
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    // Remove HTML tags and dangerous characters
    .replace(/<[^>]*>/g, '')
    // Remove script-related protocols
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/onload=/gi, '')
    .replace(/onerror=/gi, '')
    .replace(/onclick=/gi, '')
    .replace(/onmouseover=/gi, '')
    // Remove SQL injection attempts
    .replace(/('|(\\')|(;)|(%27)|(%3B)|(")|(\\"))/gi, '')
    // Remove potential script tags in various encodings
    .replace(/(%3C)|(%3E)|(%22)|(%27)|(%2F)/gi, '')
    // Remove null bytes and other control characters
    .replace(/\0/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
};

export const validateEmail = (email: string): boolean => {
  // Enhanced email validation with security checks
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Check for common attack patterns
  if (email.includes('<script') || email.includes('javascript:') || email.includes('data:')) {
    return false;
  }
  
  // Check for suspicious consecutive dots or invalid characters
  if (email.includes('..') || email.match(/[<>]/)) {
    return false;
  }
  
  return emailRegex.test(email) && email.length >= 5 && email.length <= 254; // RFC 5321 limit
};

export const validatePhone = (phone: string): boolean => {
  // Enhanced phone validation with security checks
  const phoneRegex = /^[\d\s\-\+\(\)\.]+$/;
  
  // Check for injection attempts
  if (phone.includes('<') || phone.includes('>') || phone.includes('script')) {
    return false;
  }
  
  const digitsOnly = phone.replace(/\D/g, '');
  return phoneRegex.test(phone) && digitsOnly.length >= 10 && digitsOnly.length <= 15 && phone.length <= 20;
};

export const validateName = (name: string): boolean => {
  // Enhanced name validation with security checks
  const nameRegex = /^[a-zA-Z\s\-\.\']+$/;
  
  // Check for injection attempts and suspicious patterns
  if (name.includes('<') || name.includes('>') || name.includes('script') || 
      name.includes('javascript:') || name.includes('data:') || name.includes('--')) {
    return false;
  }
  
  // Check for excessive repeating characters (potential spam)
  if (/(.)\1{4,}/.test(name)) {
    return false;
  }
  
  return nameRegex.test(name) && name.length >= 2 && name.length <= 100;
};

export const validateMessage = (message: string): boolean => {
  // Enhanced message validation with security checks
  if (message.length < 10 || message.length > 2000) {
    return false;
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script[^>]*>/gi,
    /javascript:/gi,
    /data:/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi,
    /style\s*=.*expression/gi,
    /eval\s*\(/gi,
    /document\.(write|cookie)/gi
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(message)) {
      return false;
    }
  }
  
  // Check for excessive HTML-like content
  const htmlTagCount = (message.match(/</g) || []).length;
  if (htmlTagCount > 5) {
    return false;
  }
  
  return true;
};
