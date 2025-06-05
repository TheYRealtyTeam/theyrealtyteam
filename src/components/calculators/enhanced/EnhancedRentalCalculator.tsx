
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calculator, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import PropertyDetailsStep from './steps/PropertyDetailsStep';
import FinancingStep from './steps/FinancingStep';
import IncomeExpensesStep from './steps/IncomeExpensesStep';
import ResultsDashboard from './ResultsDashboard';
import { CalculatorState, CalculatorResults } from './types';

interface EnhancedRentalCalculatorProps {
  sharedState: any;
  updateSharedState: (updates: any) => void;
}

const steps = [
  { id: 1, title: 'Property Details', icon: <DollarSign className="h-4 w-4" /> },
  { id: 2, title: 'Financing', icon: <Calculator className="h-4 w-4" /> },
  { id: 3, title: 'Income & Expenses', icon: <TrendingUp className="h-4 w-4" /> },
  { id: 4, title: 'Results', icon: <PieChart className="h-4 w-4" /> }
];

const EnhancedRentalCalculator = ({ sharedState, updateSharedState }: EnhancedRentalCalculatorProps) => {
  const [currentStep, setCurrentStep] = useState(1);
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
    // Sync with shared state
    updateSharedState(calculatorState);
  }, [calculatorState]);

  const calculateResults = () => {
    const monthlyIncome = calculatorState.isYearly ? calculatorState.monthlyRent / 12 : calculatorState.monthlyRent;
    
    // Calculate mortgage payment
    const principal = calculatorState.propertyValue - calculatorState.downPaymentAmount;
    const monthlyRate = calculatorState.interestRate / 100 / 12;
    const numPayments = calculatorState.loanTerm * 12;
    const mortgagePayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    // Calculate monthly expenses
    const propertyTaxMonthly = calculatorState.propertyTax / 12;
    const insuranceMonthly = calculatorState.insurance / 12;
    const vacancyCost = (monthlyIncome * calculatorState.vacancyRate) / 100;
    
    let managementCost = 0;
    if (calculatorState.isFlatFee) {
      managementCost = calculatorState.managementFee;
    } else {
      managementCost = (monthlyIncome * calculatorState.managementFee) / 100;
    }
    
    const monthlyExpenses = propertyTaxMonthly + 
                           insuranceMonthly + 
                           calculatorState.maintenanceCost + 
                           vacancyCost + 
                           managementCost + 
                           mortgagePayment + 
                           calculatorState.otherExpenses;
    
    const monthlyCashFlow = monthlyIncome - monthlyExpenses;
    const annualCashFlow = monthlyCashFlow * 12;
    
    // Calculate returns
    const closingCosts = calculatorState.propertyValue * 0.03;
    const initialInvestment = calculatorState.downPaymentAmount + closingCosts;
    
    const cashOnCashReturn = initialInvestment > 0 ? (annualCashFlow / initialInvestment) * 100 : 0;
    const netOperatingIncome = (monthlyIncome * 12) - ((propertyTaxMonthly + insuranceMonthly + calculatorState.maintenanceCost + managementCost + calculatorState.otherExpenses) * 12);
    const capRate = (netOperatingIncome / calculatorState.propertyValue) * 100;
    
    const breakEvenPoint = monthlyCashFlow > 0 ? 0 : Math.abs(annualCashFlow / monthlyCashFlow);
    
    setResults({
      monthlyIncome,
      monthlyExpenses,
      monthlyCashFlow,
      annualCashFlow,
      cashOnCashReturn,
      capRate,
      totalROI: cashOnCashReturn,
      breakEvenPoint,
      mortgagePayment
    });
  };

  const updateCalculatorState = (updates: Partial<CalculatorState>) => {
    setCalculatorState(prev => {
      const newState = { ...prev, ...updates };
      
      // Auto-calculate dependent values
      if (updates.propertyValue !== undefined || updates.downPaymentPercent !== undefined) {
        newState.downPaymentAmount = (newState.propertyValue * newState.downPaymentPercent) / 100;
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
          <PropertyDetailsStep 
            state={calculatorState} 
            updateState={updateCalculatorState}
            results={results}
          />
        );
      case 2:
        return (
          <FinancingStep 
            state={calculatorState} 
            updateState={updateCalculatorState}
            results={results}
          />
        );
      case 3:
        return (
          <IncomeExpensesStep 
            state={calculatorState} 
            updateState={updateCalculatorState}
            results={results}
          />
        );
      case 4:
        return (
          <ResultsDashboard 
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
      {/* Progress Header */}
      <Card className="mb-6 bg-gradient-to-r from-yrealty-navy to-yrealty-blue text-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-2xl font-bold">Property Investment Calculator</CardTitle>
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

      {/* Step Content */}
      <div className="animate-fade-in">
        {renderStep()}
      </div>

      {/* Navigation */}
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

export default EnhancedRentalCalculator;
