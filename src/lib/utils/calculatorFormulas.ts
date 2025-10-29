/**
 * Comprehensive Calculator Formulas
 * All financial calculations used across calculators
 * Documented with sources and examples
 */

/**
 * Calculate monthly mortgage payment using amortization formula
 * Formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
 * Where:
 *   M = Monthly payment
 *   P = Principal (loan amount)
 *   r = Monthly interest rate (annual rate / 12 / 100)
 *   n = Number of payments (years * 12)
 * 
 * Source: Standard mortgage amortization formula
 * @example calculateMortgagePayment(200000, 4.5, 30) // Returns ~1013.37
 */
export const calculateMortgagePayment = (
  principal: number,
  annualInterestRate: number,
  loanTermYears: number
): number => {
  if (principal <= 0 || loanTermYears <= 0) return 0;
  
  const monthlyRate = annualInterestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;
  
  // Handle zero interest rate
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }
  
  const monthlyPayment = 
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
  return monthlyPayment;
};

/**
 * Calculate capitalization rate (Cap Rate)
 * Formula: Cap Rate = (NOI / Property Value) * 100
 * Where:
 *   NOI = Net Operating Income (annual)
 *   Property Value = Current market value
 * 
 * Typical range: 4%-10% (higher is better)
 * @example calculateCapRate(24000, 300000) // Returns 8.0%
 */
export const calculateCapRate = (
  netOperatingIncome: number,
  propertyValue: number
): number => {
  if (propertyValue <= 0) return 0;
  return (netOperatingIncome / propertyValue) * 100;
};

/**
 * Calculate cash-on-cash return
 * Formula: CoC = (Annual Cash Flow / Total Investment) * 100
 * Where:
 *   Annual Cash Flow = Yearly income after all expenses
 *   Total Investment = Down payment + closing costs + repairs
 * 
 * Target: 8-12% for good rental property
 * @example calculateCashOnCashReturn(10000, 80000) // Returns 12.5%
 */
export const calculateCashOnCashReturn = (
  annualCashFlow: number,
  totalInvestment: number
): number => {
  if (totalInvestment <= 0) return 0;
  return (annualCashFlow / totalInvestment) * 100;
};

/**
 * Calculate total return on investment (ROI)
 * Formula: ROI = (Total Gain / Total Investment) * 100
 * Where:
 *   Total Gain = Profit from sale + cash flow over holding period
 *   Total Investment = All upfront costs
 * 
 * @example calculateTotalROI(150000, 100000) // Returns 50%
 */
export const calculateTotalROI = (
  totalGain: number,
  totalInvestment: number
): number => {
  if (totalInvestment <= 0) return 0;
  return (totalGain / totalInvestment) * 100;
};

/**
 * Calculate annualized ROI from total ROI
 * Formula: Annualized ROI = [(1 + Total ROI)^(1/years) - 1] * 100
 * Where:
 *   Total ROI = Total return percentage (as decimal)
 *   years = Holding period in years
 * 
 * @example calculateAnnualizedROI(50, 5) // Returns ~8.45% per year
 */
export const calculateAnnualizedROI = (
  totalROIPercent: number,
  holdingPeriodYears: number
): number => {
  if (holdingPeriodYears <= 0) return 0;
  const totalROIDecimal = totalROIPercent / 100;
  return (Math.pow(1 + totalROIDecimal, 1 / holdingPeriodYears) - 1) * 100;
};

/**
 * Calculate net operating income (NOI)
 * Formula: NOI = Gross Income - Operating Expenses
 * Where:
 *   Gross Income = Total rental income
 *   Operating Expenses = Tax, insurance, maintenance, management (NOT mortgage)
 * 
 * Note: NOI does NOT include mortgage payments
 * @example calculateNOI(30000, 12000) // Returns 18000
 */
export const calculateNOI = (
  grossAnnualIncome: number,
  annualOperatingExpenses: number
): number => {
  return grossAnnualIncome - annualOperatingExpenses;
};

/**
 * Calculate property appreciation
 * Formula: Future Value = Present Value * (1 + rate)^years
 * 
 * @example calculateAppreciation(300000, 3, 5) // Returns ~347,782
 */
export const calculateAppreciation = (
  currentValue: number,
  annualAppreciationRate: number,
  years: number
): number => {
  const rate = annualAppreciationRate / 100;
  return currentValue * Math.pow(1 + rate, years);
};

/**
 * Calculate remaining loan balance after payments
 * Formula: Balance = P * [(1+r)^n - (1+r)^p] / [(1+r)^n - 1]
 * Where:
 *   P = Original principal
 *   r = Monthly interest rate
 *   n = Total number of payments
 *   p = Number of payments made
 * 
 * @example calculateRemainingBalance(200000, 4.5, 30, 60) // Balance after 5 years
 */
export const calculateRemainingBalance = (
  originalPrincipal: number,
  annualInterestRate: number,
  loanTermYears: number,
  paymentsMade: number
): number => {
  const monthlyRate = annualInterestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;
  
  if (monthlyRate === 0) {
    return originalPrincipal - (originalPrincipal / totalPayments * paymentsMade);
  }
  
  const numerator = 
    Math.pow(1 + monthlyRate, totalPayments) - Math.pow(1 + monthlyRate, paymentsMade);
  const denominator = 
    Math.pow(1 + monthlyRate, totalPayments) - 1;
    
  return originalPrincipal * (numerator / denominator);
};

/**
 * Calculate debt service coverage ratio (DSCR)
 * Formula: DSCR = NOI / Annual Debt Service
 * 
 * Typical minimum: 1.25 (lenders want NOI to be 125% of mortgage payments)
 * @example calculateDSCR(24000, 18000) // Returns 1.33
 */
export const calculateDSCR = (
  netOperatingIncome: number,
  annualDebtService: number
): number => {
  if (annualDebtService <= 0) return 0;
  return netOperatingIncome / annualDebtService;
};

/**
 * Calculate gross rent multiplier (GRM)
 * Formula: GRM = Property Value / Gross Annual Rent
 * 
 * Lower is better (faster payback)
 * Typical range: 4-7 years
 * @example calculateGRM(300000, 36000) // Returns 8.33
 */
export const calculateGRM = (
  propertyValue: number,
  grossAnnualRent: number
): number => {
  if (grossAnnualRent <= 0) return 0;
  return propertyValue / grossAnnualRent;
};
