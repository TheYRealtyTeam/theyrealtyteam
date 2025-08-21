/**
 * Utility functions for handling number inputs in calculators
 */

/**
 * Formats a number for display in an input field
 * Returns empty string for 0 values to avoid showing "0" in empty fields
 */
export const formatInputValue = (value: number | string | undefined): string => {
  if (value === undefined || value === null || value === '' || value === 0) {
    return '';
  }
  return String(value);
};

/**
 * Parses input value and returns a number
 * Returns 0 for empty or invalid inputs to ensure calculations work
 */
export const parseInputValue = (value: string): number => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Handles number input changes with proper empty state handling
 */
export const handleNumberInputChange = (
  field: string,
  value: string,
  updateFunction: (updates: any) => void
) => {
  // Store the display value as is (can be empty string)
  // But convert to number for calculations
  const numericValue = parseInputValue(value);
  updateFunction({ [field]: numericValue });
};