// Centralized calculation utilities

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

export const calculateMortgagePayment = (
  principal: number,
  monthlyRate: number,
  numberOfPayments: number
): number => {
  if (monthlyRate === 0) return principal / numberOfPayments;
  
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  );
};

export const calculateROI = (
  gain: number,
  cost: number
): number => {
  return ((gain - cost) / cost) * 100;
};

export const calculateCashFlow = (
  monthlyRent: number,
  monthlyExpenses: number,
  monthlyMortgage: number
): number => {
  return monthlyRent - monthlyExpenses - monthlyMortgage;
};

export const calculateCapRate = (
  annualIncome: number,
  propertyValue: number
): number => {
  return (annualIncome / propertyValue) * 100;
};

// Validation utilities
export const validatePositiveNumber = (value: number): boolean => {
  return !isNaN(value) && value > 0;
};

export const validatePercentage = (value: number): boolean => {
  return !isNaN(value) && value >= 0 && value <= 100;
};

// Date utilities
export const formatDateForDisplay = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTimeForDisplay = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};