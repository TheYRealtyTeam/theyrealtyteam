
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
    const loanAmount = calculatorState.propertyValue - calculatorState.downPaymentAmount;
    const monthlyRate = calculatorState.interestRate / 100 / 12;
    const numberOfPayments = calculatorState.loanTerm * 12;
    
    const monthlyPrincipalInterest = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const monthlyPropertyTax = calculatorState.propertyTax / 12;
    const monthlyInsurance = calculatorState.insurance / 12;
    const monthlyPMI = calculatorState.downPaymentPercent < 20 ? calculatorState.pmi : 0;
    const monthlyHOA = calculatorState.hoaFees;
    
    const totalMonthlyPayment = monthlyPrincipalInterest + monthlyPropertyTax + 
                               monthlyInsurance + monthlyPMI + monthlyHOA;
    
    const totalPaymentLifetime = totalMonthlyPayment * numberOfPayments;
    const totalInterestPaid = (monthlyPrincipalInterest * numberOfPayments) - loanAmount;
    
    // Calculate current month breakdown
    const interestPayment = loanAmount * monthlyRate;
    const principalPayment = monthlyPrincipalInterest - interestPayment;
    
    setResults({
      monthlyPrincipalInterest,
      monthlyPropertyTax,
      monthlyInsurance,
      monthlyPMI,
      monthlyHOA,
      totalMonthlyPayment,
      totalPaymentLifetime,
      totalInterestPaid,
      loanAmount,
      monthlyPaymentBreakdown: {
        principal: principalPayment,
        interest: interestPayment,
        taxes: monthlyPropertyTax,
        insurance: monthlyInsurance,
        pmi: monthlyPMI,
        hoa: monthlyHOA
      }
    });
  };

  const updateCalculatorState = (updates: Partial<MortgageCalculatorState>) => {
    setCalculatorState(prev => {
      const newState = { ...prev, ...updates };
      
      // Handle bidirectional sync between down payment amount and percentage
      if (updates.propertyValue !== undefined || updates.downPaymentPercent !== undefined) {
        // Calculate amount from percentage
        newState.downPaymentAmount = (newState.propertyValue * newState.downPaymentPercent) / 100;
      } else if (updates.downPaymentAmount !== undefined) {
        // Calculate percentage from amount
        newState.downPaymentPercent = newState.propertyValue > 0 
          ? (newState.downPaymentAmount / newState.propertyValue) * 100 
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
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Real-time calculations update as you type
                </p>
              </div>
              
              <Button 
                onClick={nextStep}
                className="bg-yrealty-navy hover:bg-yrealty-navy/90 flex items-center space-x-2"
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
