
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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254; // RFC 5321 limit
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)\.]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10 && phone.length <= 20;
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s\-\.\']+$/;
  return nameRegex.test(name) && name.length >= 2 && name.length <= 100;
};

export const validateMessage = (message: string): boolean => {
  return message.length >= 10 && message.length <= 2000;
};
