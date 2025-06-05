
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Calendar, 
  Download, 
  Share2,
  Target,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { CalculatorState, CalculatorResults } from './types';
import { Link } from 'react-router-dom';

interface ResultsDashboardProps {
  state: CalculatorState;
  results: CalculatorResults;
}

const ResultsDashboard = ({ state, results }: ResultsDashboardProps) => {
  const getPerformanceRating = () => {
    if (results.cashOnCashReturn >= 10) return { rating: 'Excellent', color: 'bg-green-500', icon: CheckCircle };
    if (results.cashOnCashReturn >= 6) return { rating: 'Good', color: 'bg-blue-500', icon: CheckCircle };
    if (results.cashOnCashReturn >= 3) return { rating: 'Fair', color: 'bg-yellow-500', icon: AlertTriangle };
    return { rating: 'Poor', color: 'bg-red-500', icon: AlertTriangle };
  };

  const performance = getPerformanceRating();

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <Card className="bg-gradient-to-r from-yrealty-navy to-yrealty-blue text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-2xl">Investment Analysis</span>
            <Badge className={`${performance.color} text-white`}>
              <performance.icon className="h-4 w-4 mr-1" />
              {performance.rating}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">
                {results.cashOnCashReturn.toFixed(1)}%
              </div>
              <p className="text-sm opacity-90">Cash-on-Cash Return</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">
                {results.capRate.toFixed(1)}%
              </div>
              <p className="text-sm opacity-90">Cap Rate</p>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-1 ${
                results.monthlyCashFlow >= 0 ? 'text-green-200' : 'text-red-200'
              }`}>
                ${results.monthlyCashFlow.toLocaleString()}
              </div>
              <p className="text-sm opacity-90">Monthly Cash Flow</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Monthly Income</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${results.monthlyIncome.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">Gross rental income</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium text-gray-600">Monthly Expenses</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${results.monthlyExpenses.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">Total operating costs</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Annual Cash Flow</span>
            </div>
            <div className={`text-2xl font-bold ${
              results.annualCashFlow >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              ${results.annualCashFlow.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">Yearly profit/loss</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-600">Initial Investment</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${(state.downPaymentAmount + (state.propertyValue * 0.03)).toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">Down payment + closing costs</p>
          </CardContent>
        </Card>
      </div>

      {/* Investment Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-yrealty-accent" />
              <span>Key Investment Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Cash-on-Cash Return</span>
              <span className="font-bold text-yrealty-navy">{results.cashOnCashReturn.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Cap Rate</span>
              <span className="font-bold text-yrealty-navy">{results.capRate.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Expense Ratio</span>
              <span className="font-bold text-yrealty-navy">
                {((results.monthlyExpenses / results.monthlyIncome) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Monthly ROI</span>
              <span className="font-bold text-yrealty-navy">
                {((results.monthlyCashFlow / (state.downPaymentAmount + (state.propertyValue * 0.03))) * 100).toFixed(2)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investment Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.cashOnCashReturn < 6 && (
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Consider Optimization</h4>
                      <p className="text-sm text-yellow-700">
                        Your return is below market average. Consider increasing rent, reducing expenses, or exploring better financing options.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {results.monthlyCashFlow < 0 && (
                <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800">Negative Cash Flow</h4>
                      <p className="text-sm text-red-700">
                        This property requires monthly contributions. Review rental rates and expenses before proceeding.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {results.cashOnCashReturn >= 8 && results.monthlyCashFlow > 0 && (
                <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">Strong Investment</h4>
                      <p className="text-sm text-green-700">
                        This property shows excellent potential with strong cash flow and returns above market average.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-yrealty-navy">Ready to Move Forward?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our property investment specialists can help you analyze this opportunity in detail and develop a customized investment strategy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild className="bg-yrealty-navy hover:bg-yrealty-navy/90 text-white px-8 py-3">
                <Link to="/appointment">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Consultation
                </Link>
              </Button>
              
              <Button variant="outline" className="border-yrealty-navy text-yrealty-navy hover:bg-yrealty-navy hover:text-white px-8 py-3">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              
              <Button variant="outline" className="border-yrealty-navy text-yrealty-navy hover:bg-yrealty-navy hover:text-white px-8 py-3">
                <Share2 className="h-4 w-4 mr-2" />
                Share Analysis
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="text-center text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
        <p>
          * This analysis is for informational purposes only and should not be considered financial advice. 
          Consult with a qualified financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
};

export default ResultsDashboard;
