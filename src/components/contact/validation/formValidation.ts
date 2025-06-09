
// Enhanced input sanitization function
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential XSS characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, ''); // Remove vbscript: protocol
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
