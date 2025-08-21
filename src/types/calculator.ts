// Calculator-related type definitions
export interface MortgageCalculatorState {
  propertyPrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTax: number;
  insurance: number;
  pmi?: number;
  hoaFees?: number;
}

export interface ROICalculatorState {
  purchasePrice: number;
  downPayment: number;
  monthlyRent: number;
  monthlyExpenses: number;
  annualAppreciation: number;
  closingCosts?: number;
  renovationCosts?: number;
  vacancyRate?: number;
}

export interface RentalCalculatorState {
  propertyPrice: number;
  downPayment: number;
  monthlyRent: number;
  monthlyExpenses: number;
  mortgageRate: number;
  loanTerm: number;
}

export interface CalculatorResults {
  monthlyPayment?: number;
  totalInvestment?: number;
  monthlyReturn?: number;
  annualReturn?: number;
  roi?: number;
  cashFlow?: number;
  capRate?: number;
}

// More flexible shared state for calculator communication
export interface SharedCalculatorState {
  [key: string]: string | number | boolean | undefined;
  propertyValue?: number;
  downPaymentPercent?: number;
  downPaymentAmount?: number;
  interestRate?: number;
  loanTerm?: number;
  propertyTax?: number;
  insurance?: number;
  monthlyRent?: number;
  closingCosts?: number;
  renovationCosts?: number;
  maintenanceCost?: number;
  vacancyRate?: number;
  managementFee?: number;
  otherExpenses?: number;
  isFlatFee?: boolean;
  holdingPeriod?: number;
  annualAppreciation?: number;
}