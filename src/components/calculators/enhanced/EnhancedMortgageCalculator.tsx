
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calculator, Home, DollarSign, PieChart } from 'lucide-react';
import MortgageLoanDetailsStep from './steps/mortgage/MortgageLoanDetailsStep';
import MortgageLoanTermsStep from './steps/mortgage/MortgageLoanTermsStep';
import MortgageAdditionalCostsStep from './steps/mortgage/MortgageAdditionalCostsStep';
import MortgageResultsDashboard from './MortgageResultsDashboard';
import { MortgageCalculatorState, MortgageResults } from './types/mortgageTypes';
import { SharedCalculatorState } from '@/types/calculator';
import { safeCalculateMortgage, validatePositiveNumber, validatePercentage } from '@/lib/utils/calculatorValidation';

interface EnhancedMortgageCalculatorProps {
  sharedState: SharedCalculatorState;
  updateSharedState: (updates: SharedCalculatorState) => void;
}

const steps = [
  { id: 1, title: 'Loan Details', icon: <Home className="h-4 w-4" /> },
  { id: 2, title: 'Loan Terms', icon: <Calculator className="h-4 w-4" /> },
  { id: 3, title: 'Additional Costs', icon: <DollarSign className="h-4 w-4" /> },
  { id: 4, title: 'Results', icon: <PieChart className="h-4 w-4" /> }
];

const EnhancedMortgageCalculator = ({ sharedState, updateSharedState }: EnhancedMortgageCalculatorProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [calculatorState, setCalculatorState] = useState<MortgageCalculatorState>({
    propertyValue: (typeof sharedState.propertyValue === 'number' ? sharedState.propertyValue : 300000),
    downPaymentPercent: (typeof sharedState.downPaymentPercent === 'number' ? sharedState.downPaymentPercent : 20),
    downPaymentAmount: (typeof sharedState.downPaymentAmount === 'number' ? sharedState.downPaymentAmount : 60000),
    interestRate: (typeof sharedState.interestRate === 'number' ? sharedState.interestRate : 4.5),
    loanTerm: (typeof sharedState.loanTerm === 'number' ? sharedState.loanTerm : 30),
    propertyTax: (typeof sharedState.propertyTax === 'number' ? sharedState.propertyTax : 3000),
    insurance: (typeof sharedState.insurance === 'number' ? sharedState.insurance : 1200),
    pmi: 150,
    hoaFees: 0,
    propertyType: 'single-family',
    location: ''
  });

  const [results, setResults] = useState<MortgageResults>({
    monthlyPrincipalInterest: 0,
    monthlyPropertyTax: 0,
    monthlyInsurance: 0,
    monthlyPMI: 0,
    monthlyHOA: 0,
    totalMonthlyPayment: 0,
    totalPaymentLifetime: 0,
    totalInterestPaid: 0,
    loanAmount: 0,
    monthlyPaymentBreakdown: {
      principal: 0,
      interest: 0,
      taxes: 0,
      insurance: 0,
      pmi: 0,
      hoa: 0
    }
  });

  useEffect(() => {
    calculateResults();
    updateSharedState({
      propertyValue: calculatorState.propertyValue,
      downPaymentPercent: calculatorState.downPaymentPercent,
      downPaymentAmount: calculatorState.downPaymentAmount,
      interestRate: calculatorState.interestRate,
      loanTerm: calculatorState.loanTerm,
      propertyTax: calculatorState.propertyTax,
      insurance: calculatorState.insurance
    });
  }, [calculatorState]);

  const calculateResults = () => {
    try {
      const loanAmount = validatePositiveNumber(
        calculatorState.propertyValue - calculatorState.downPaymentAmount
      );
      
      // Use safe mortgage calculation
      const monthlyPrincipalInterest = safeCalculateMortgage(
        loanAmount,
        calculatorState.interestRate,
        calculatorState.loanTerm
      );
      
      const monthlyPropertyTax = validatePositiveNumber(calculatorState.propertyTax / 12);
      const monthlyInsurance = validatePositiveNumber(calculatorState.insurance / 12);
      const monthlyPMI = calculatorState.downPaymentPercent < 20 
        ? validatePositiveNumber(calculatorState.pmi) 
        : 0;
      const monthlyHOA = validatePositiveNumber(calculatorState.hoaFees);
      
      const totalMonthlyPayment = validatePositiveNumber(
        monthlyPrincipalInterest + monthlyPropertyTax + 
        monthlyInsurance + monthlyPMI + monthlyHOA
      );
      
      const numberOfPayments = calculatorState.loanTerm * 12;
      const totalPaymentLifetime = validatePositiveNumber(totalMonthlyPayment * numberOfPayments);
      const totalInterestPaid = validatePositiveNumber(
        (monthlyPrincipalInterest * numberOfPayments) - loanAmount
      );
      
      // Calculate current month breakdown
      const monthlyRate = calculatorState.interestRate / 100 / 12;
      const interestPayment = validatePositiveNumber(loanAmount * monthlyRate);
      const principalPayment = validatePositiveNumber(monthlyPrincipalInterest - interestPayment);
      
      setResults({
        monthlyPrincipalInterest: validatePositiveNumber(monthlyPrincipalInterest),
        monthlyPropertyTax: validatePositiveNumber(monthlyPropertyTax),
        monthlyInsurance: validatePositiveNumber(monthlyInsurance),
        monthlyPMI: validatePositiveNumber(monthlyPMI),
        monthlyHOA: validatePositiveNumber(monthlyHOA),
        totalMonthlyPayment: validatePositiveNumber(totalMonthlyPayment),
        totalPaymentLifetime: validatePositiveNumber(totalPaymentLifetime),
        totalInterestPaid: validatePositiveNumber(totalInterestPaid),
        loanAmount: validatePositiveNumber(loanAmount),
        monthlyPaymentBreakdown: {
          principal: validatePositiveNumber(principalPayment),
          interest: validatePositiveNumber(interestPayment),
          taxes: validatePositiveNumber(monthlyPropertyTax),
          insurance: validatePositiveNumber(monthlyInsurance),
          pmi: validatePositiveNumber(monthlyPMI),
          hoa: validatePositiveNumber(monthlyHOA)
        }
      });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error calculating mortgage results:', error);
      }
      // Set default values on error
      setResults({
        monthlyPrincipalInterest: 0,
        monthlyPropertyTax: 0,
        monthlyInsurance: 0,
        monthlyPMI: 0,
        monthlyHOA: 0,
        totalMonthlyPayment: 0,
        totalPaymentLifetime: 0,
        totalInterestPaid: 0,
        loanAmount: 0,
        monthlyPaymentBreakdown: {
          principal: 0,
          interest: 0,
          taxes: 0,
          insurance: 0,
          pmi: 0,
          hoa: 0
        }
      });
    }
  };

  const updateCalculatorState = (updates: Partial<MortgageCalculatorState>) => {
    setCalculatorState(prev => {
      const newState = { ...prev, ...updates };
      
      // Handle bidirectional sync between down payment amount and percentage with validation
      if (updates.propertyValue !== undefined || updates.downPaymentPercent !== undefined) {
        // Calculate amount from percentage
        const propertyValue = validatePositiveNumber(newState.propertyValue);
        const downPaymentPercent = validatePercentage(newState.downPaymentPercent);
        newState.downPaymentAmount = validatePositiveNumber(
          (propertyValue * downPaymentPercent) / 100
        );
      } else if (updates.downPaymentAmount !== undefined) {
        // Calculate percentage from amount
        const propertyValue = validatePositiveNumber(newState.propertyValue);
        const downPaymentAmount = validatePositiveNumber(newState.downPaymentAmount);
        newState.downPaymentPercent = propertyValue > 0 
          ? validatePercentage((downPaymentAmount / propertyValue) * 100)
          : 0;
      }
      
      return newState;
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = (currentStep / steps.length) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <MortgageLoanDetailsStep 
            state={calculatorState} 
            updateState={updateCalculatorState}
            results={results}
          />
        );
      case 2:
        return (
          <MortgageLoanTermsStep 
            state={calculatorState} 
            updateState={updateCalculatorState}
            results={results}
          />
        );
      case 3:
        return (
          <MortgageAdditionalCostsStep 
            state={calculatorState} 
            updateState={updateCalculatorState}
            results={results}
          />
        );
      case 4:
        return (
          <MortgageResultsDashboard 
            state={calculatorState} 
            results={results}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="mb-6 bg-gradient-to-r from-yrealty-navy to-yrealty-blue text-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-2xl font-bold">Mortgage Calculator</CardTitle>
            <Badge variant="secondary" className="bg-white/20 text-white">
              Step {currentStep} of {steps.length}
            </Badge>
          </div>
          
          <Progress value={progressPercentage} className="h-2 bg-white/20" />
          
          <div className="flex items-center justify-between mt-4">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`flex items-center space-x-2 ${
                  step.id <= currentStep ? 'text-white' : 'text-white/60'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  step.id <= currentStep ? 'bg-yrealty-accent' : 'bg-white/20'
                }`}>
                  {step.icon}
                </div>
                <span className="text-sm font-medium hidden md:block">{step.title}</span>
              </div>
            ))}
          </div>
        </CardHeader>
      </Card>

      <div className="animate-fade-in">
        {renderStep()}
      </div>

      {currentStep < 4 && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 w-full sm:w-auto"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
              
              <div className="hidden lg:block text-center flex-1 px-4">
                <p className="text-sm text-gray-600 whitespace-nowrap">
                  Real-time calculations update as you type
                </p>
              </div>
              
              <Button 
                onClick={nextStep}
                className="bg-yrealty-navy hover:bg-yrealty-navy/90 flex items-center space-x-2 w-full sm:w-auto"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedMortgageCalculator;
