import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Calculator, DollarSign, Home, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Tools = () => {
  const [rentalCalc, setRentalCalc] = useState({
    propertyValue: 300000,
    monthlyRent: 2500,
    expenses: 800
  });

  const [mortgageCalc, setMortgageCalc] = useState({
    loanAmount: 240000,
    interestRate: 4.5,
    loanTerm: 30
  });

  const calculateRentalROI = () => {
    const annualRent = rentalCalc.monthlyRent * 12;
    const annualExpenses = rentalCalc.expenses * 12;
    const netIncome = annualRent - annualExpenses;
    return ((netIncome / rentalCalc.propertyValue) * 100).toFixed(2);
  };

  const calculateMortgage = () => {
    const monthlyRate = mortgageCalc.interestRate / 100 / 12;
    const numberOfPayments = mortgageCalc.loanTerm * 12;
    const monthlyPayment = (mortgageCalc.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return monthlyPayment.toFixed(2);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout 
      title="Property Investment Tools"
      subtitle="Free calculators and tools to help you make informed property investment decisions"
      metaDescription="Access free property investment calculators for rental income, mortgage payments, and ROI analysis. Make data-driven real estate investment decisions."
    >
      <div className="max-w-6xl mx-auto">
        {/* Featured Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Rental ROI Calculator */}
          <Card className="p-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-yrealty-navy flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-yrealty-accent" />
                Rental ROI Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="propertyValue">Property Value ($)</Label>
                <Input
                  id="propertyValue"
                  type="number"
                  value={rentalCalc.propertyValue}
                  onChange={(e) => setRentalCalc(prev => ({...prev, propertyValue: Number(e.target.value)}))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="monthlyRent">Monthly Rent ($)</Label>
                <Input
                  id="monthlyRent"
                  type="number"
                  value={rentalCalc.monthlyRent}
                  onChange={(e) => setRentalCalc(prev => ({...prev, monthlyRent: Number(e.target.value)}))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="expenses">Monthly Expenses ($)</Label>
                <Input
                  id="expenses"
                  type="number"
                  value={rentalCalc.expenses}
                  onChange={(e) => setRentalCalc(prev => ({...prev, expenses: Number(e.target.value)}))}
                  className="mt-1"
                />
              </div>
              <div className="bg-yrealty-blue p-4 rounded-lg">
                <h4 className="font-bold text-yrealty-navy mb-2">Annual ROI</h4>
                <p className="text-3xl font-bold text-yrealty-accent">{calculateRentalROI()}%</p>
              </div>
            </CardContent>
          </Card>

          {/* Mortgage Calculator */}
          <Card className="p-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-yrealty-navy flex items-center gap-3">
                <Home className="h-8 w-8 text-yrealty-accent" />
                Mortgage Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={mortgageCalc.loanAmount}
                  onChange={(e) => setMortgageCalc(prev => ({...prev, loanAmount: Number(e.target.value)}))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  value={mortgageCalc.interestRate}
                  onChange={(e) => setMortgageCalc(prev => ({...prev, interestRate: Number(e.target.value)}))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="loanTerm">Loan Term (years)</Label>
                <Input
                  id="loanTerm"
                  type="number"
                  value={mortgageCalc.loanTerm}
                  onChange={(e) => setMortgageCalc(prev => ({...prev, loanTerm: Number(e.target.value)}))}
                  className="mt-1"
                />
              </div>
              <div className="bg-yrealty-blue p-4 rounded-lg">
                <h4 className="font-bold text-yrealty-navy mb-2">Monthly Payment</h4>
                <p className="text-3xl font-bold text-yrealty-accent">${calculateMortgage()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <Calculator className="h-12 w-12 text-yrealty-accent mx-auto mb-4" />
            <h3 className="text-lg font-bold text-yrealty-navy mb-2">Cash Flow Calculator</h3>
            <p className="text-gray-600 mb-4">Calculate monthly cash flow from rental properties</p>
            <Button variant="outline" className="w-full">Coming Soon</Button>
          </Card>
          
          <Card className="p-6 text-center">
            <TrendingUp className="h-12 w-12 text-yrealty-accent mx-auto mb-4" />
            <h3 className="text-lg font-bold text-yrealty-navy mb-2">Market Analysis Tool</h3>
            <p className="text-gray-600 mb-4">Analyze local market trends and property values</p>
            <Button variant="outline" className="w-full">Coming Soon</Button>
          </Card>
          
          <Card className="p-6 text-center">
            <Home className="h-12 w-12 text-yrealty-accent mx-auto mb-4" />
            <h3 className="text-lg font-bold text-yrealty-navy mb-2">Property Comparison</h3>
            <p className="text-gray-600 mb-4">Compare multiple investment properties side by side</p>
            <Button variant="outline" className="w-full">Coming Soon</Button>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-yrealty-navy to-yrealty-accent p-8 rounded-2xl text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Need Professional Analysis?
          </h3>
          <p className="text-lg mb-6 opacity-95 max-w-2xl mx-auto">
            Our property management experts can provide detailed investment analysis and personalized recommendations for your portfolio.
          </p>
          <Button asChild className="bg-white text-yrealty-navy hover:bg-gray-100 text-lg px-8 py-4 font-bold">
            <a href="/contact">Schedule a Consultation</a>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Tools;