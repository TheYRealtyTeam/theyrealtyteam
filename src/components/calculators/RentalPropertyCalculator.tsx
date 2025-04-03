
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleLeft, ToggleRight } from 'lucide-react';

const RentalPropertyCalculator = () => {
  const [formData, setFormData] = useState({
    monthlyRent: 2000,
    propertyValue: 300000,
    propertyTax: 3000,
    insurance: 1200,
    maintenancePercent: 5,
    vacancyRate: 5,
    managementFee: 8,
    mortgagePayment: 1500,
    otherExpenses: 100,
    downPaymentPercent: 20
  });
  
  const [isFlatFee, setIsFlatFee] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
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
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };
  
  // Calculate down payment amount based on percentage
  const downPaymentAmount = (formData.propertyValue * formData.downPaymentPercent) / 100;
  
  const calculateResults = () => {
    // Calculate monthly income
    const monthlyIncome = isYearly ? formData.monthlyRent / 12 : formData.monthlyRent;
    
    // Calculate monthly expenses
    const propertyTaxMonthly = formData.propertyTax / 12;
    const insuranceMonthly = formData.insurance / 12;
    const maintenanceCost = (monthlyIncome * formData.maintenancePercent) / 100;
    const vacancyCost = (monthlyIncome * formData.vacancyRate) / 100;
    
    // Calculate management fee based on type (percentage or flat)
    let managementCost = 0;
    if (isFlatFee) {
      managementCost = formData.managementFee; // Flat fee is already a monthly amount
    } else {
      managementCost = (monthlyIncome * formData.managementFee) / 100; // Percentage of rent
    }
    
    const otherExpenses = formData.otherExpenses;
    
    const monthlyExpenses = propertyTaxMonthly + 
                           insuranceMonthly + 
                           maintenanceCost + 
                           vacancyCost + 
                           managementCost + 
                           formData.mortgagePayment + 
                           otherExpenses;
    
    // Calculate cash flow
    const monthlyCashFlow = monthlyIncome - monthlyExpenses;
    const annualCashFlow = monthlyCashFlow * 12;
    
    // Using the calculated down payment for cash on cash return calculation
    const closingCosts = formData.propertyValue * 0.03;
    const initialInvestment = downPaymentAmount + closingCosts;
    
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
                  {isYearly ? 'Yearly' : 'Monthly'} Rent ($)
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Monthly</span>
                  <Switch 
                    checked={isYearly}
                    onCheckedChange={setIsYearly}
                    className="data-[state=checked]:bg-yrealty-navy"
                  />
                  <span className="text-xs text-gray-500">Yearly</span>
                </div>
              </div>
              <input
                type="number"
                name="monthlyRent"
                value={formData.monthlyRent}
                onChange={handleChange}
                className="input-field"
                placeholder={isYearly ? "Enter yearly rent" : "Enter monthly rent"}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Value ($)</label>
              <input
                type="number"
                name="propertyValue"
                value={formData.propertyValue}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Down Payment (%)</label>
                <span className="text-sm text-gray-500">${downPaymentAmount.toLocaleString()}</span>
              </div>
              <Input
                type="number"
                name="downPaymentPercent"
                value={formData.downPaymentPercent}
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
                value={formData.propertyTax}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Insurance ($)</label>
              <input
                type="number"
                name="insurance"
                value={formData.insurance}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>
        </div>
        
        <div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance (% of rent)</label>
              <input
                type="number"
                name="maintenancePercent"
                value={formData.maintenancePercent}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vacancy Rate (%)</label>
              <input
                type="number"
                name="vacancyRate"
                value={formData.vacancyRate}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Management Fee {isFlatFee ? '($)' : '(%)'}
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Percentage</span>
                  <Switch 
                    checked={isFlatFee}
                    onCheckedChange={setIsFlatFee}
                    className="data-[state=checked]:bg-yrealty-navy"
                  />
                  <span className="text-xs text-gray-500">Flat Fee</span>
                </div>
              </div>
              <input
                type="number"
                name="managementFee"
                value={formData.managementFee}
                onChange={handleChange}
                className="input-field"
                placeholder={isFlatFee ? "Enter flat fee amount" : "Enter percentage"}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Mortgage Payment ($)</label>
              <input
                type="number"
                name="mortgagePayment"
                value={formData.mortgagePayment}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Other Monthly Expenses ($)</label>
              <input
                type="number"
                name="otherExpenses"
                value={formData.otherExpenses}
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
              <p className="text-xl font-bold text-yrealty-navy">${results.monthlyExpenses.toFixed(2)}</p>
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
            <p>* Cash on Cash Return is based on your {formData.downPaymentPercent}% down payment (${downPaymentAmount.toLocaleString()}) and 3% closing costs.</p>
            <p>* Consult with a financial advisor for personalized investment advice.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalPropertyCalculator;
