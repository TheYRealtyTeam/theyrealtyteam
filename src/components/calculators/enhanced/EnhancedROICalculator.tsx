
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, DollarSign, TrendingUp, Target, PieChart, BarChart } from 'lucide-react';
import ROIPropertyDetailsStep from './steps/roi/ROIPropertyDetailsStep';
import ROIIncomeProjectionsStep from './steps/roi/ROIIncomeProjectionsStep';
import ROIOperatingExpensesStep from './steps/roi/ROIOperatingExpensesStep';
import ROIInvestmentTimelineStep from './steps/roi/ROIInvestmentTimelineStep';
import ROIResultsDashboard from './ROIResultsDashboard';
import { ROICalculatorState, ROIResults } from './types/roiTypes';
import { SharedCalculatorState } from '@/types/calculator';
import { safeCalculateMortgage, validatePositiveNumber, validatePercentage, safePercentage } from '@/lib/utils/calculatorValidation';

interface EnhancedROICalculatorProps {
  sharedState: SharedCalculatorState;
  updateSharedState: (updates: SharedCalculatorState) => void;
}

const steps = [
  { id: 1, title: 'Property Details', icon: <DollarSign className="h-4 w-4" /> },
  { id: 2, title: 'Income Projections', icon: <TrendingUp className="h-4 w-4" /> },
  { id: 3, title: 'Operating Expenses', icon: <BarChart className="h-4 w-4" /> },
  { id: 4, title: 'Investment Timeline', icon: <Target className="h-4 w-4" /> },
  { id: 5, title: 'ROI Analysis', icon: <PieChart className="h-4 w-4" /> }
];

const EnhancedROICalculator = ({ sharedState, updateSharedState }: EnhancedROICalculatorProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [calculatorState, setCalculatorState] = useState<ROICalculatorState>({
    propertyValue: sharedState.propertyValue || 300000,
    downPaymentPercent: sharedState.downPaymentPercent || 20,
    downPaymentAmount: sharedState.downPaymentAmount || 60000,
    closingCosts: sharedState.closingCosts || 5000,
    renovationCosts: sharedState.renovationCosts || 10000,
    monthlyRent: sharedState.monthlyRent || 2000,
    annualAppreciation: sharedState.annualAppreciation || 3,
    rentGrowthRate: 2,
    propertyTax: sharedState.propertyTax || 3000,
    insurance: sharedState.insurance || 1200,
    maintenanceCost: sharedState.maintenanceCost || 100,
    vacancyRate: sharedState.vacancyRate || 5,
    managementFee: sharedState.managementFee || 8,
    otherExpenses: sharedState.otherExpenses || 100,
    isFlatFee: sharedState.isFlatFee || false,
    holdingPeriod: sharedState.holdingPeriod || 5,
    targetReturn: 8,
    interestRate: sharedState.interestRate || 4.5,
    loanTerm: sharedState.loanTerm || 30
  });

  const [results, setResults] = useState<ROIResults>({
    totalInvestment: 0,
    monthlyCashFlow: 0,
    annualCashFlow: 0,
    totalCashFlow: 0,
    propertyValueAtSale: 0,
    equityAtSale: 0,
    totalROI: 0,
    annualizedROI: 0,
    capRate: 0,
    cashOnCashReturn: 0,
    breakEvenPoint: 0,
    mortgagePayment: 0,
    projectedNetWorth: 0
  });

  // Real-time calculations
  useEffect(() => {
    calculateResults();
    // Sync with shared state
    updateSharedState({
      propertyValue: calculatorState.propertyValue,
      downPaymentPercent: calculatorState.downPaymentPercent,
      downPaymentAmount: calculatorState.downPaymentAmount,
      interestRate: calculatorState.interestRate,
      loanTerm: calculatorState.loanTerm,
      monthlyRent: calculatorState.monthlyRent,
      closingCosts: calculatorState.closingCosts,
      renovationCosts: calculatorState.renovationCosts,
      maintenanceCost: calculatorState.maintenanceCost,
      vacancyRate: calculatorState.vacancyRate,
      managementFee: calculatorState.managementFee,
      otherExpenses: calculatorState.otherExpenses,
      isFlatFee: calculatorState.isFlatFee,
      holdingPeriod: calculatorState.holdingPeriod,
      annualAppreciation: calculatorState.annualAppreciation
    });
  }, [calculatorState]);

  const calculateResults = () => {
    try {
      // Calculate total initial investment
      const totalInvestment = validatePositiveNumber(
        calculatorState.downPaymentAmount + 
        calculatorState.closingCosts + 
        calculatorState.renovationCosts
      );
      
      // Calculate mortgage payment with safe function
      const loanAmount = validatePositiveNumber(
        calculatorState.propertyValue - calculatorState.downPaymentAmount
      );
      const mortgagePayment = safeCalculateMortgage(
        loanAmount,
        calculatorState.interestRate,
        calculatorState.loanTerm
      );
      
      // Calculate monthly expenses for cash flow
      const monthlyRent = validatePositiveNumber(calculatorState.monthlyRent);
      const propertyTaxMonthly = validatePositiveNumber(calculatorState.propertyTax / 12);
      const insuranceMonthly = validatePositiveNumber(calculatorState.insurance / 12);
      const maintenanceCost = validatePositiveNumber(calculatorState.maintenanceCost);
      const vacancyCost = validatePositiveNumber((monthlyRent * calculatorState.vacancyRate) / 100);
      
      // Calculate management fee based on type (percentage or flat)
      let managementCost = 0;
      if (calculatorState.isFlatFee) {
        managementCost = validatePositiveNumber(calculatorState.managementFee);
      } else {
        managementCost = validatePositiveNumber((monthlyRent * calculatorState.managementFee) / 100);
      }
      
      const totalMonthlyExpenses = validatePositiveNumber(
        propertyTaxMonthly + 
        insuranceMonthly + 
        maintenanceCost + 
        vacancyCost + 
        managementCost + 
        mortgagePayment + 
        calculatorState.otherExpenses
      );
      
      // Calculate monthly and annual cash flow
      const monthlyCashFlow = monthlyRent - totalMonthlyExpenses;
      const annualCashFlow = monthlyCashFlow * 12;
      
      // Calculate total cash flow over holding period with rent growth
      let totalCashFlow = 0;
      for (let year = 1; year <= calculatorState.holdingPeriod; year++) {
        const adjustedRent = monthlyRent * Math.pow(1 + (calculatorState.rentGrowthRate / 100), year - 1);
        const yearlyExpenses = totalMonthlyExpenses * 12;
        const yearlyCashFlow = (adjustedRent * 12) - yearlyExpenses;
        totalCashFlow += yearlyCashFlow;
      }
      
      // Calculate property value after appreciation
      const propertyValueAtSale = validatePositiveNumber(
        calculatorState.propertyValue * 
        Math.pow(1 + (calculatorState.annualAppreciation / 100), calculatorState.holdingPeriod)
      );
      
      // Calculate remaining loan balance after holding period
      let remainingBalance = loanAmount;
      const monthlyRate = calculatorState.interestRate / 100 / 12;
      for (let i = 0; i < calculatorState.holdingPeriod * 12; i++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = mortgagePayment - interestPayment;
        remainingBalance -= principalPayment;
        if (remainingBalance < 0) remainingBalance = 0;
      }
      
      // Equity at sale = property value - remaining loan balance
      const equityAtSale = validatePositiveNumber(
        propertyValueAtSale - Math.max(0, remainingBalance)
      );
      
      // Calculate total profit
      const totalProfit = equityAtSale - calculatorState.downPaymentAmount + totalCashFlow;
      
      // Calculate total ROI percentage
      const totalROI = safePercentage(totalProfit, totalInvestment);
      
      // Calculate annualized ROI
      const annualizedROI = calculatorState.holdingPeriod > 0 ? 
        validatePositiveNumber((Math.pow(1 + (totalROI / 100), 1 / calculatorState.holdingPeriod) - 1) * 100) : 0;
      
      // Calculate cap rate
      const netOperatingIncome = (monthlyRent * 12) - 
        ((propertyTaxMonthly + insuranceMonthly + maintenanceCost + 
          managementCost + calculatorState.otherExpenses) * 12);
      const capRate = safePercentage(netOperatingIncome, calculatorState.propertyValue);
      
      // Calculate cash-on-cash return
      const cashOnCashReturn = safePercentage(annualCashFlow, totalInvestment);
      
      // Calculate break-even point
      const breakEvenPoint = monthlyCashFlow > 0 ? 0 : 
        validatePositiveNumber(Math.abs(annualCashFlow) / Math.abs(monthlyCashFlow));
      
      // Calculate projected net worth
      const projectedNetWorth = validatePositiveNumber(totalInvestment + totalProfit);
      
      setResults({
        totalInvestment: validatePositiveNumber(totalInvestment),
        monthlyCashFlow,
        annualCashFlow,
        totalCashFlow: validatePositiveNumber(totalCashFlow),
        propertyValueAtSale: validatePositiveNumber(propertyValueAtSale),
        equityAtSale: validatePositiveNumber(equityAtSale),
        totalROI: validatePositiveNumber(totalROI),
        annualizedROI: validatePositiveNumber(annualizedROI),
        capRate: validatePositiveNumber(capRate),
        cashOnCashReturn: validatePositiveNumber(cashOnCashReturn),
        breakEvenPoint: validatePositiveNumber(breakEvenPoint),
        mortgagePayment: validatePositiveNumber(mortgagePayment),
        projectedNetWorth: validatePositiveNumber(projectedNetWorth)
      });
    } catch (error) {
      console.error('Error calculating ROI results:', error);
      // Set default values on error
      setResults({
        totalInvestment: 0,
        monthlyCashFlow: 0,
        annualCashFlow: 0,
        totalCashFlow: 0,
        propertyValueAtSale: 0,
        equityAtSale: 0,
        totalROI: 0,
        annualizedROI: 0,
        capRate: 0,
        cashOnCashReturn: 0,
        breakEvenPoint: 0,
        mortgagePayment: 0,
        projectedNetWorth: 0
      });
    }
  };

  const updateCalculatorState = (updates: Partial<ROICalculatorState>) => {
    setCalculatorState(prev => {
      const newState = { ...prev, ...updates };
      
      // Auto-calculate dependent values with validation
      if (updates.propertyValue !== undefined || updates.downPaymentPercent !== undefined) {
        const propertyValue = validatePositiveNumber(newState.propertyValue);
        const downPaymentPercent = validatePercentage(newState.downPaymentPercent);
        newState.downPaymentAmount = validatePositiveNumber(
          (propertyValue * downPaymentPercent) / 100
        );
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
          <ROIPropertyDetailsStep 
            state={calculatorState} 
            updateState={updateCalculatorState}
            results={results}
          />
        );
      case 2:
        return (
          <ROIIncomeProjectionsStep 
            state={calculatorState} 
            updateState={updateCalculatorState}
            results={results}
          />
        );
      case 3:
        return (
          <ROIOperatingExpensesStep 
            state={calculatorState} 
            updateState={updateCalculatorState}
            results={results}
          />
        );
      case 4:
        return (
          <ROIInvestmentTimelineStep 
            state={calculatorState} 
            updateState={updateCalculatorState}
            results={results}
          />
        );
      case 5:
        return (
          <ROIResultsDashboard 
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
            <CardTitle className="text-2xl font-bold">ROI Investment Calculator</CardTitle>
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
      {currentStep < 5 && (
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

export default EnhancedROICalculator;
