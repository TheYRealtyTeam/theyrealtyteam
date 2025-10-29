/**
 * Comprehensive validation utilities for calculator inputs
 */

export const validateNumber = (value: number, min: number = 0, max: number = Infinity): number => {
  if (isNaN(value) || !isFinite(value)) {
    return min;
  }
  return Math.max(min, Math.min(max, value));
};

export const validatePercentage = (value: number): number => {
  return validateNumber(value, 0, 100);
};

export const validatePositiveNumber = (value: number): number => {
  return validateNumber(value, 0);
};

export const safeCalculateMortgage = (
  principal: number,
  annualRate: number,
  years: number
): number => {
  // Validate inputs
  if (principal <= 0 || years <= 0) {
    return 0;
  }

  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  // Handle zero interest rate case
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }

  // Standard mortgage calculation
  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  // Validate result
  return validatePositiveNumber(monthlyPayment);
};

export const safeDivide = (numerator: number, denominator: number, defaultValue: number = 0): number => {
  if (denominator === 0 || !isFinite(denominator)) {
    return defaultValue;
  }
  const result = numerator / denominator;
  return isFinite(result) ? result : defaultValue;
};

export const safePercentage = (value: number, total: number): number => {
  if (total === 0 || !isFinite(total)) {
    return 0;
  }
  const result = (value / total) * 100;
  return isFinite(result) ? validatePercentage(result) : 0;
};
