/**
 * Calculator Testing and Validation Utilities
 * Used for quality assurance and debugging
 */

export interface TestResult {
  passed: boolean;
  testName: string;
  expected: number;
  actual: number;
  error?: string;
}

/**
 * Test mortgage calculation accuracy
 */
export const testMortgageCalculation = (
  principal: number,
  annualRate: number,
  years: number,
  expected: number
): TestResult => {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  let actual: number;
  if (monthlyRate === 0) {
    actual = principal / numberOfPayments;
  } else {
    actual = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
             (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  }
  
  const tolerance = 0.01; // Allow $0.01 difference
  const passed = Math.abs(actual - expected) <= tolerance;
  
  return {
    passed,
    testName: 'Mortgage Payment Calculation',
    expected,
    actual,
    error: passed ? undefined : `Difference: $${Math.abs(actual - expected).toFixed(2)}`
  };
};

/**
 * Test ROI calculation accuracy
 */
export const testROICalculation = (
  totalProfit: number,
  totalInvestment: number,
  expectedROI: number
): TestResult => {
  const actual = totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0;
  const tolerance = 0.01; // Allow 0.01% difference
  const passed = Math.abs(actual - expectedROI) <= tolerance;
  
  return {
    passed,
    testName: 'ROI Calculation',
    expected: expectedROI,
    actual,
    error: passed ? undefined : `Difference: ${Math.abs(actual - expectedROI).toFixed(2)}%`
  };
};

/**
 * Test cash flow calculation
 */
export const testCashFlowCalculation = (
  monthlyIncome: number,
  monthlyExpenses: number,
  expectedCashFlow: number
): TestResult => {
  const actual = monthlyIncome - monthlyExpenses;
  const tolerance = 0.01;
  const passed = Math.abs(actual - expectedCashFlow) <= tolerance;
  
  return {
    passed,
    testName: 'Cash Flow Calculation',
    expected: expectedCashFlow,
    actual,
    error: passed ? undefined : `Difference: $${Math.abs(actual - expectedCashFlow).toFixed(2)}`
  };
};

/**
 * Run comprehensive calculator tests
 */
export const runCalculatorTests = (): TestResult[] => {
  const results: TestResult[] = [];
  
  // Test 1: Standard 30-year mortgage at 4.5%
  results.push(
    testMortgageCalculation(240000, 4.5, 30, 1216.04)
  );
  
  // Test 2: 15-year mortgage at 3.5%
  results.push(
    testMortgageCalculation(300000, 3.5, 15, 2144.65)
  );
  
  // Test 3: Zero interest rate
  results.push(
    testMortgageCalculation(120000, 0, 10, 1000)
  );
  
  // Test 4: ROI calculation
  results.push(
    testROICalculation(50000, 100000, 50)
  );
  
  // Test 5: Cash flow calculation
  results.push(
    testCashFlowCalculation(2000, 1500, 500)
  );
  
  return results;
};

/**
 * Validate calculator inputs
 */
export const validateCalculatorInputs = (inputs: {
  propertyValue?: number;
  downPaymentPercent?: number;
  interestRate?: number;
  loanTerm?: number;
  monthlyRent?: number;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (inputs.propertyValue !== undefined) {
    if (inputs.propertyValue <= 0) {
      errors.push('Property value must be greater than 0');
    }
    if (inputs.propertyValue > 100000000) {
      errors.push('Property value seems unusually high (>$100M)');
    }
  }
  
  if (inputs.downPaymentPercent !== undefined) {
    if (inputs.downPaymentPercent < 0 || inputs.downPaymentPercent > 100) {
      errors.push('Down payment percentage must be between 0 and 100');
    }
  }
  
  if (inputs.interestRate !== undefined) {
    if (inputs.interestRate < 0 || inputs.interestRate > 30) {
      errors.push('Interest rate should be between 0 and 30%');
    }
  }
  
  if (inputs.loanTerm !== undefined) {
    if (inputs.loanTerm <= 0 || inputs.loanTerm > 50) {
      errors.push('Loan term should be between 1 and 50 years');
    }
  }
  
  if (inputs.monthlyRent !== undefined) {
    if (inputs.monthlyRent < 0) {
      errors.push('Monthly rent cannot be negative');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Performance monitoring
 */
export const measureCalculationPerformance = (
  calculationFn: () => void
): number => {
  const start = performance.now();
  calculationFn();
  const end = performance.now();
  return end - start;
};

/**
 * Log test results (for development only)
 */
export const logTestResults = (results: TestResult[]): void => {
  if (process.env.NODE_ENV === 'development') {
    console.group('🧪 Calculator Test Results');
    results.forEach(result => {
      if (result.passed) {
        console.log(`✅ ${result.testName}: PASSED`);
      } else {
        console.error(`❌ ${result.testName}: FAILED`, {
          expected: result.expected,
          actual: result.actual,
          error: result.error
        });
      }
    });
    console.groupEnd();
  }
};
