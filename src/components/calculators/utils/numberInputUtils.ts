/**
 * Utility functions for handling number inputs in calculators
 */

/**
 * Formats a number for display in an input field
 * Preserves the user's input as-is to allow typing trailing zeros
 */
export const formatInputValue = (value: number | string | undefined, displayValue?: string): string => {
  // If we have a display value that's being actively typed, use it
  if (displayValue !== undefined && displayValue !== null) {
    return displayValue;
  }
  
  // Otherwise, format the number but handle empty/undefined cases
  if (value === undefined || value === null || value === '') {
    return '';
  }
  
  // Show zero values as "0" so users can see and modify them
  return String(value);
};

/**
 * Parses input value and returns a number
 * Returns 0 for empty or invalid inputs to ensure calculations work
 */
export const parseInputValue = (value: string): number => {
  if (value === '' || value === undefined || value === null) {
    return 0;
  }
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Handles number input changes with proper empty state handling
 * Maintains the display value to preserve user typing (like trailing zeros)
 */
export const handleNumberInputChange = (
  field: string,
  value: string,
  updateFunction: (updates: any) => void,
  setDisplayValues?: (updates: any) => void
) => {
  // Store the raw display value for the input
  if (setDisplayValues) {
    setDisplayValues({ [field]: value });
  }
  
  // Convert to number for calculations
  const numericValue = parseInputValue(value);
  updateFunction({ [field]: numericValue });
};