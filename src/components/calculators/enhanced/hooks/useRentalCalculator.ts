
import { useState, useEffect } from 'react';
import { CalculatorState, CalculatorResults } from '../types';
import { safeCalculateMortgage, validatePositiveNumber, safePercentage, safeDivide, validatePercentage } from '@/lib/utils/calculatorValidation';

export const useRentalCalculator = (sharedState: Partial<CalculatorState>, updateSharedState: (updates: Partial<CalculatorState>) => void) => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    propertyValue: sharedState.propertyValue || 300000,
    downPaymentPercent: sharedState.downPaymentPercent || 20,
    downPaymentAmount: sharedState.downPaymentAmount || 60000,
    interestRate: sharedState.interestRate || 4.5,
    loanTerm: sharedState.loanTerm || 30,
    monthlyRent: sharedState.monthlyRent || 2000,
    propertyTax: sharedState.propertyTax || 3000,
    insurance: sharedState.insurance || 1200,
    maintenanceCost: sharedState.maintenanceCost || 100,
    vacancyRate: sharedState.vacancyRate || 5,
    managementFee: sharedState.managementFee || 8,
    otherExpenses: sharedState.otherExpenses || 100,
    isFlatFee: sharedState.isFlatFee || false,
    isYearly: sharedState.isYearly || false,
    propertyType: 'single-family',
    location: '',
    holdingPeriod: 5,
    targetReturn: 8
  });

  const [results, setResults] = useState<CalculatorResults>({
    monthlyIncome: 0,
    monthlyExpenses: 0,
    monthlyCashFlow: 0,
    annualCashFlow: 0,
    cashOnCashReturn: 0,
    capRate: 0,
    totalROI: 0,
    breakEvenPoint: 0,
    mortgagePayment: 0
  });

  // Real-time calculations
  useEffect(() => {
    calculateResults();
    updateSharedState(calculatorState);
  }, [calculatorState]);

  const calculateResults = () => {
    try {
      const monthlyIncome = validatePositiveNumber(
        calculatorState.isYearly ? calculatorState.monthlyRent / 12 : calculatorState.monthlyRent
      );
      
      // Calculate mortgage payment with safe function
      const principal = validatePositiveNumber(
        calculatorState.propertyValue - calculatorState.downPaymentAmount
      );
      const mortgagePayment = safeCalculateMortgage(
        principal,
        calculatorState.interestRate,
        calculatorState.loanTerm
      );
      
      // Calculate monthly expenses
      const propertyTaxMonthly = validatePositiveNumber(calculatorState.propertyTax / 12);
      const insuranceMonthly = validatePositiveNumber(calculatorState.insurance / 12);
      const vacancyCost = validatePositiveNumber((monthlyIncome * calculatorState.vacancyRate) / 100);
      
      let managementCost = 0;
      if (calculatorState.isFlatFee) {
        managementCost = validatePositiveNumber(calculatorState.managementFee);
      } else {
        managementCost = validatePositiveNumber((monthlyIncome * calculatorState.managementFee) / 100);
      }
      
      const monthlyExpenses = validatePositiveNumber(
        propertyTaxMonthly + 
        insuranceMonthly + 
        calculatorState.maintenanceCost + 
        vacancyCost + 
        managementCost + 
        mortgagePayment + 
        calculatorState.otherExpenses
      );
      
      const monthlyCashFlow = monthlyIncome - monthlyExpenses;
      const annualCashFlow = monthlyCashFlow * 12;
      
      // Calculate returns
      const closingCosts = validatePositiveNumber(calculatorState.propertyValue * 0.03);
      const initialInvestment = validatePositiveNumber(
        calculatorState.downPaymentAmount + closingCosts
      );
      
      const cashOnCashReturn = safePercentage(annualCashFlow, initialInvestment);
      const netOperatingIncome = (monthlyIncome * 12) - 
        ((propertyTaxMonthly + insuranceMonthly + calculatorState.maintenanceCost + 
          managementCost + calculatorState.otherExpenses) * 12);
      const capRate = safePercentage(netOperatingIncome, calculatorState.propertyValue);
      
      const breakEvenPoint = monthlyCashFlow > 0 ? 0 : safeDivide(Math.abs(annualCashFlow), Math.abs(monthlyCashFlow), 0);
      
      setResults({
        monthlyIncome: validatePositiveNumber(monthlyIncome),
        monthlyExpenses: validatePositiveNumber(monthlyExpenses),
        monthlyCashFlow,
        annualCashFlow,
        cashOnCashReturn: validatePositiveNumber(cashOnCashReturn),
        capRate: validatePositiveNumber(capRate),
        totalROI: validatePositiveNumber(cashOnCashReturn),
        breakEvenPoint: validatePositiveNumber(breakEvenPoint),
        mortgagePayment: validatePositiveNumber(mortgagePayment)
      });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error calculating rental results:', error);
      }
      // Set default values on error
      setResults({
        monthlyIncome: 0,
        monthlyExpenses: 0,
        monthlyCashFlow: 0,
        annualCashFlow: 0,
        cashOnCashReturn: 0,
        capRate: 0,
        totalROI: 0,
        breakEvenPoint: 0,
        mortgagePayment: 0
      });
    }
  };

  const updateCalculatorState = (updates: Partial<CalculatorState>) => {
    setCalculatorState(prev => {
      const newState = { ...prev, ...updates };
      
      // Auto-calculate dependent values with validation
      if (updates.propertyValue !== undefined || updates.downPaymentPercent !== undefined) {
        const propertyValue = validatePositiveNumber(newState.propertyValue);
        const downPaymentPercent = validatePercentage(newState.downPaymentPercent);
        newState.downPaymentAmount = validatePositiveNumber((propertyValue * downPaymentPercent) / 100);
      }
      
      return newState;
    });
  };

  return {
    calculatorState,
    results,
    updateCalculatorState
  };
};
