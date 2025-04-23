import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';

interface RentalPropertyCalculatorProps {
  sharedState: {
    propertyValue: number;
    downPaymentPercent: number;
    downPaymentAmount: number;
    monthlyRent: number;
    propertyTax: number;
    insurance: number;
    maintenanceCost: number;
    vacancyRate: number;
    managementFee: number;
    mortgagePayment: number;
    otherExpenses: number;
    isFlatFee: boolean;
    isYearly: boolean;
  };
  updateSharedState: (updates: Partial<RentalPropertyCalculatorProps['sharedState']>) => void;
}

const RentalPropertyCalculator = ({ sharedState, updateSharedState }: RentalPropertyCalculatorProps) => {
  const [results, setResults] = useState({
    monthlyIncome: 0,
    monthlyExpenses: 0,
    monthlyCashFlow: 0,
    annualCashFlow: 0,
    cashOnCashReturn: 0
  });
  
  const [showResults, setShowResults] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateSharedState({ [name]: parseFloat(value) || 0 });
  };
  
  const calculateResults = () => {
    const monthlyIncome = sharedState.isYearly ? sharedState.monthlyRent / 12 : sharedState.monthlyRent;
    
    const propertyTaxMonthly = sharedState.propertyTax / 12;
    const insuranceMonthly = sharedState.insurance / 12;
    const maintenanceCost = sharedState.maintenanceCost;
    const vacancyCost = (monthlyIncome * sharedState.vacancyRate) / 100;
    
    let managementCost = 0;
    if (sharedState.isFlatFee) {
      managementCost = sharedState.managementFee;
    } else {
      managementCost = (monthlyIncome * sharedState.managementFee) / 100;
    }
    
    const otherExpenses = sharedState.otherExpenses;
    
    const monthlyExpenses = propertyTaxMonthly + 
                           insuranceMonthly + 
                           maintenanceCost + 
                           vacancyCost + 
                           managementCost + 
                           sharedState.mortgagePayment + 
                           otherExpenses;
    
    const monthlyCashFlow = monthlyIncome - monthlyExpenses;
    const annualCashFlow = monthlyCashFlow * 12;
    
    const closingCosts = sharedState.propertyValue * 0.03;
    const initialInvestment = sharedState.downPaymentAmount + closingCosts;
    
    const cashOnCashReturn = initialInvestment > 0 ? (annualCashFlow / initialInvestment) * 100 : 0;
    
    setResults({
      monthlyIncome,
      monthlyExpenses,
      monthlyCashFlow,
      annualCashFlow,
      cashOnCashReturn
    });
    
    setShowResults(true);
  };
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  {sharedState.isYearly ? 'Yearly' : 'Monthly'} Rent ($)
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Monthly</span>
                  <Switch 
                    checked={sharedState.isYearly}
                    onCheckedChange={(checked) => updateSharedState({ isYearly: checked })}
                    className="data-[state=checked]:bg-yrealty-navy"
                  />
                  <span className="text-xs text-gray-500">Yearly</span>
                </div>
              </div>
              <input
                type="number"
                name="monthlyRent"
                value={sharedState.monthlyRent}
                onChange={handleChange}
                className="input-field"
                placeholder={sharedState.isYearly ? "Enter yearly rent" : "Enter monthly rent"}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Value ($)</label>
              <input
                type="number"
                name="propertyValue"
                value={sharedState.propertyValue}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Down Payment (%)</label>
                <span className="text-sm text-gray-500">${sharedState.downPaymentAmount.toLocaleString()}</span>
              </div>
              <Input
                type="number"
                name="downPaymentPercent"
                value={sharedState.downPaymentPercent}
                onChange={handleChange}
                className="input-field"
                min="0"
                max="100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Property Tax ($)</label>
              <input
                type="number"
                name="propertyTax"
                value={sharedState.propertyTax}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Insurance ($)</label>
              <input
                type="number"
                name="insurance"
                value={sharedState.insurance}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>
        </div>
        
        <div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Maintenance ($)</label>
              <input
                type="number"
                name="maintenanceCost"
                value={sharedState.maintenanceCost}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vacancy Rate (%)</label>
              <input
                type="number"
                name="vacancyRate"
                value={sharedState.vacancyRate}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Management Fee {sharedState.isFlatFee ? '($)' : '(%)'}
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Percentage</span>
                  <Switch 
                    checked={sharedState.isFlatFee}
                    onCheckedChange={(checked) => updateSharedState({ isFlatFee: checked })}
                    className="data-[state=checked]:bg-yrealty-navy"
                  />
                  <span className="text-xs text-gray-500">Flat Fee</span>
                </div>
              </div>
              <input
                type="number"
                name="managementFee"
                value={sharedState.managementFee}
                onChange={handleChange}
                className="input-field"
                placeholder={sharedState.isFlatFee ? "Enter flat fee amount" : "Enter percentage"}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Mortgage Payment ($)</label>
              <input
                type="number"
                name="mortgagePayment"
                value={sharedState.mortgagePayment}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Other Monthly Expenses ($)</label>
              <input
                type="number"
                name="otherExpenses"
                value={sharedState.otherExpenses}
                onChange={handleChange}
                className="input-field"
              />
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
          <h3 className="text-xl font-bold mb-4 text-yrealty-navy">Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Monthly Income</p>
              <p className="text-xl font-bold text-yrealty-navy">${results.monthlyIncome.toFixed(2)}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Monthly Expenses</p>
              <div className="flex items-center space-x-2 mb-1">
                <Info className="h-4 w-4 text-blue-500" />
                <span className="text-xs text-gray-500">
                  Calculated automatically based on your input fields
                </span>
              </div>
              <input
                type="number"
                value={results.monthlyExpenses.toFixed(2)}
                readOnly
                className="input-field bg-gray-100 cursor-not-allowed"
              />
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
            
            <div className="bg-white p-4 rounded-lg shadow-sm md:col-span-2">
              <p className="text-gray-500 text-sm">Cash on Cash Return</p>
              <p className={`text-xl font-bold ${results.cashOnCashReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {results.cashOnCashReturn.toFixed(2)}%
              </p>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>* Cash on Cash Return is based on your {sharedState.downPaymentPercent}% down payment (${sharedState.downPaymentAmount.toLocaleString()}) and 3% closing costs.</p>
            <p>* Consult with a financial advisor for personalized investment advice.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalPropertyCalculator;
