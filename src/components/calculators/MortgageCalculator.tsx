
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const MortgageCalculator = () => {
  const [formData, setFormData] = useState({
    homePrice: 300000,
    downPayment: 60000,
    interestRate: 4.5,
    loanTerm: 30,
    propertyTax: 3000,
    insurance: 1200
  });
  
  const [results, setResults] = useState({
    monthlyPrincipalInterest: 0,
    monthlyPropertyTax: 0,
    monthlyInsurance: 0,
    totalMonthlyPayment: 0,
    totalPaymentLifetime: 0,
    totalInterestPaid: 0
  });
  
  const [showResults, setShowResults] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };
  
  const calculateResults = () => {
    // Calculate loan amount
    const loanAmount = formData.homePrice - formData.downPayment;
    
    // Calculate monthly interest rate (annual rate divided by 12)
    const monthlyRate = (formData.interestRate / 100) / 12;
    
    // Calculate number of payments (years * 12)
    const numberOfPayments = formData.loanTerm * 12;
    
    // Calculate monthly principal and interest payment
    const monthlyPrincipalInterest = loanAmount * 
                                  (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                                  (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    // Calculate monthly property tax and insurance
    const monthlyPropertyTax = formData.propertyTax / 12;
    const monthlyInsurance = formData.insurance / 12;
    
    // Calculate total monthly payment
    const totalMonthlyPayment = monthlyPrincipalInterest + monthlyPropertyTax + monthlyInsurance;
    
    // Calculate total payment over the lifetime of the loan
    const totalPaymentLifetime = totalMonthlyPayment * numberOfPayments;
    
    // Calculate total interest paid
    const totalInterestPaid = (monthlyPrincipalInterest * numberOfPayments) - loanAmount;
    
    setResults({
      monthlyPrincipalInterest,
      monthlyPropertyTax,
      monthlyInsurance,
      totalMonthlyPayment,
      totalPaymentLifetime,
      totalInterestPaid
    });
    
    setShowResults(true);
  };
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Home Price ($)</label>
              <input
                type="number"
                name="homePrice"
                value={formData.homePrice}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment ($)</label>
              <input
                type="number"
                name="downPayment"
                value={formData.downPayment}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment Percentage</label>
              <div className="input-field bg-gray-100 flex items-center justify-between">
                <span>{((formData.downPayment / formData.homePrice) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
              <input
                type="number"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleChange}
                step="0.1"
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (years)</label>
              <select
                name="loanTerm"
                value={formData.loanTerm}
                onChange={handleChange}
                className="input-field"
              >
                <option value="15">15 years</option>
                <option value="20">20 years</option>
                <option value="30">30 years</option>
              </select>
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Principal & Interest</p>
              <p className="text-xl font-bold text-yrealty-navy">${results.monthlyPrincipalInterest.toFixed(2)}/mo</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Property Tax</p>
              <p className="text-xl font-bold text-yrealty-navy">${results.monthlyPropertyTax.toFixed(2)}/mo</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Insurance</p>
              <p className="text-xl font-bold text-yrealty-navy">${results.monthlyInsurance.toFixed(2)}/mo</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm md:col-span-3">
              <p className="text-gray-500 text-sm">Total Monthly Payment</p>
              <p className="text-2xl font-bold text-yrealty-navy">${results.totalMonthlyPayment.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Total Payment (Lifetime)</p>
              <p className="text-xl font-bold text-yrealty-navy">${results.totalPaymentLifetime.toFixed(2)}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Total Interest Paid</p>
              <p className="text-xl font-bold text-yrealty-navy">${results.totalInterestPaid.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>* This calculator provides estimates only. Actual loan terms may vary.</p>
            <p>* Consult with a mortgage lender for personalized rates and options.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
