
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ROICalculatorProps {
  sharedState: {
    propertyValue: number;
    downPaymentAmount: number;
    downPaymentPercent: number;
    closingCosts: number;
    renovationCosts: number;
    monthlyRent: number;
    mortgagePayment: number;
    propertyTax: number;
    insurance: number;
    maintenanceCost: number;
    vacancyRate: number;
    managementFee: number;
    isFlatFee: boolean;
    otherExpenses: number;
    interestRate: number;
    annualAppreciation: number;
    holdingPeriod: number;
  };
  updateSharedState: (updates: Partial<ROICalculatorProps['sharedState']>) => void;
}

const ROICalculator = ({ sharedState, updateSharedState }: ROICalculatorProps) => {
  const [results, setResults] = useState({
    totalInvestment: 0,
    monthlyCashFlow: 0,
    annualCashFlow: 0,
    totalCashFlow: 0,
    propertyValueAtSale: 0,
    equityAtSale: 0,
    totalROI: 0,
    annualizedROI: 0
  });
  
  const [showResults, setShowResults] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateSharedState({ [name]: parseFloat(value) || 0 });
  };
  
  const calculateResults = () => {
    // Calculate total initial investment
    const totalInvestment = sharedState.downPaymentAmount + sharedState.closingCosts + sharedState.renovationCosts;
    
    // Calculate monthly expenses for cash flow
    const monthlyRent = sharedState.monthlyRent;
    const propertyTaxMonthly = sharedState.propertyTax / 12;
    const insuranceMonthly = sharedState.insurance / 12;
    const maintenanceCost = sharedState.maintenanceCost;
    const vacancyCost = (monthlyRent * sharedState.vacancyRate) / 100;
    
    // Calculate management fee based on type (percentage or flat)
    let managementCost = 0;
    if (sharedState.isFlatFee) {
      managementCost = sharedState.managementFee; // Flat fee is already a monthly amount
    } else {
      managementCost = (monthlyRent * sharedState.managementFee) / 100; // Percentage of rent
    }
    
    const totalMonthlyExpenses = propertyTaxMonthly + 
                              insuranceMonthly + 
                              maintenanceCost + 
                              vacancyCost + 
                              managementCost + 
                              sharedState.mortgagePayment + 
                              sharedState.otherExpenses;
    
    // Calculate monthly and annual cash flow
    const monthlyCashFlow = monthlyRent - totalMonthlyExpenses;
    const annualCashFlow = monthlyCashFlow * 12;
    
    // Calculate total cash flow over holding period
    const totalCashFlow = annualCashFlow * sharedState.holdingPeriod;
    
    // Calculate property value after appreciation
    const propertyValueAtSale = sharedState.propertyValue * Math.pow(1 + (sharedState.annualAppreciation / 100), sharedState.holdingPeriod);
    
    // Calculate equity at sale
    // Loan amount = purchase price - down payment
    const loanAmount = sharedState.propertyValue - sharedState.downPaymentAmount;
    
    // Calculate monthly rate from annual rate
    const monthlyRate = (sharedState.interestRate / 100) / 12;
    const numberOfPayments = 30 * 12; // Assuming 30-year loan
    
    // Calculate monthly payment
    const monthlyPayment = loanAmount * 
                          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    // Calculate remaining loan balance after holding period
    let remainingBalance = loanAmount;
    for (let i = 0; i < sharedState.holdingPeriod * 12; i++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
    }
    
    // Equity at sale = property value - remaining loan balance
    const equityAtSale = propertyValueAtSale - remainingBalance;
    
    // Calculate total profit
    const totalProfit = equityAtSale - sharedState.downPaymentAmount + totalCashFlow;
    
    // Calculate total ROI percentage
    const totalROI = (totalProfit / totalInvestment) * 100;
    
    // Calculate annualized ROI
    const annualizedROI = Math.pow(1 + (totalROI / 100), 1 / sharedState.holdingPeriod) - 1;
    
    setResults({
      totalInvestment,
      monthlyCashFlow,
      annualCashFlow,
      totalCashFlow,
      propertyValueAtSale,
      equityAtSale,
      totalROI,
      annualizedROI: annualizedROI * 100
    });
    
    setShowResults(true);
  };
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price ($)</label>
              <input
                type="number"
                name="propertyValue"
                value={sharedState.propertyValue}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment ($)</label>
              <input
                type="number"
                name="downPaymentAmount"
                value={sharedState.downPaymentAmount}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  const percent = (value / sharedState.propertyValue) * 100;
                  updateSharedState({ 
                    downPaymentAmount: value,
                    downPaymentPercent: percent
                  });
                }}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Closing Costs ($)</label>
              <input
                type="number"
                name="closingCosts"
                value={sharedState.closingCosts}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Renovation Costs ($)</label>
              <input
                type="number"
                name="renovationCosts"
                value={sharedState.renovationCosts}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>
        </div>
        
        <div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rental Income ($)</label>
              <input
                type="number"
                name="monthlyRent"
                value={sharedState.monthlyRent}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Expenses ($)</label>
              <div className="input-field bg-gray-100 flex items-center justify-between">
                <span>
                  {(
                    sharedState.propertyTax / 12 +
                    sharedState.insurance / 12 +
                    sharedState.maintenanceCost +
                    (sharedState.monthlyRent * sharedState.vacancyRate) / 100 +
                    (sharedState.isFlatFee ? sharedState.managementFee : (sharedState.monthlyRent * sharedState.managementFee) / 100) +
                    sharedState.otherExpenses
                  ).toFixed(2)}
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Appreciation Rate (%)</label>
              <input
                type="number"
                name="annualAppreciation"
                value={sharedState.annualAppreciation}
                onChange={handleChange}
                step="0.1"
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Holding Period (years)</label>
              <select
                name="holdingPeriod"
                value={sharedState.holdingPeriod}
                onChange={handleChange}
                className="input-field"
              >
                <option value="1">1 year</option>
                <option value="3">3 years</option>
                <option value="5">5 years</option>
                <option value="10">10 years</option>
                <option value="15">15 years</option>
                <option value="20">20 years</option>
                <option value="30">30 years</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Button 
          onClick={calculateResults}
          className="w-full bg-yrealty-navy hover:bg-yrealty-navy/90"
        >
          Calculate
        </Button>
      </div>
      
      {showResults && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-4 text-yrealty-navy">ROI Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Total Investment</p>
              <p className="text-xl font-bold text-yrealty-navy">${results.totalInvestment.toFixed(2)}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Monthly Cash Flow</p>
              <p className={`text-xl font-bold ${results.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${results.monthlyCashFlow.toFixed(2)}
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Annual Cash Flow</p>
              <p className={`text-xl font-bold ${results.annualCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${results.annualCashFlow.toFixed(2)}
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Total Cash Flow (over holding period)</p>
              <p className={`text-xl font-bold ${results.totalCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${results.totalCashFlow.toFixed(2)}
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Property Value at Sale</p>
              <p className="text-xl font-bold text-yrealty-navy">${results.propertyValueAtSale.toFixed(2)}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Equity at Sale</p>
              <p className="text-xl font-bold text-yrealty-navy">${results.equityAtSale.toFixed(2)}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Total ROI</p>
              <p className={`text-xl font-bold ${results.totalROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {results.totalROI.toFixed(2)}%
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Annualized ROI</p>
              <p className={`text-xl font-bold ${results.annualizedROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {results.annualizedROI.toFixed(2)}%
              </p>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>* This calculator provides estimates based on the input values and assumes consistent appreciation.</p>
            <p>* Actual returns may vary based on market conditions, property management, and other factors.</p>
            <p>* Consult with a financial advisor before making investment decisions.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ROICalculator;
