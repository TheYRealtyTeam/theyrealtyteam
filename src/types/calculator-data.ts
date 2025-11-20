/**
 * Type definitions for calculator data structures
 */

export interface CalculatorData {
  state?: unknown;
  results?: unknown;
  [key: string]: unknown;
}

export interface MortgageCalculatorData extends CalculatorData {
  propertyValue: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTax: number;
  insurance: number;
  hoa?: number;
  pmi?: number;
}

export interface ROICalculatorData extends CalculatorData {
  propertyValue: number;
  downPayment: number;
  closingCosts: number;
  renovationCosts: number;
  monthlyRent: number;
  propertyTax: number;
  insurance: number;
  maintenance: number;
  vacancyRate: number;
  managementFee: number;
  holdingPeriod: number;
  appreciation: number;
}

export interface RentalCalculatorData extends CalculatorData {
  monthlyRent: number;
  propertyTax: number;
  insurance: number;
  maintenance: number;
  utilities?: number;
  hoa?: number;
  other?: number;
}
