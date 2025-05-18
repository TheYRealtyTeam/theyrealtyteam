
/**
 * Validates if the provided string is a valid email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Validates if the provided string is a valid phone format
 * Allows formats like (123) 456-7890, 123-456-7890, 1234567890
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return phoneRegex.test(phone);
};

/**
 * Checks if the date is a weekend (Saturday or Sunday)
 */
export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

/**
 * Checks if the date is in the past
 */
export const isPastDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * Determines if a date should be disabled in the date picker
 */
export const isDateDisabled = (date: Date): boolean => {
  return isWeekend(date) || isPastDate(date);
};

/**
 * Formats a Date object to a readable string
 */
export const formatDate = (date: Date | undefined): string => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
