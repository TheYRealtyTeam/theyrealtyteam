import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  calculatorName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary for calculator components
 * Catches errors and displays user-friendly message
 */
class CalculatorErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Calculator Error (${this.props.calculatorName || 'Unknown'}):`, error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-900">
              <AlertTriangle className="h-5 w-5" />
              Calculator Error
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-red-800">
              We encountered an error while calculating your results. This has been logged and will be fixed.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="p-3 bg-red-100 rounded text-xs font-mono text-red-900 overflow-auto">
                {this.state.error.message}
              </div>
            )}
            
            <div className="flex gap-3">
              <Button 
                onClick={this.handleReset}
                variant="outline"
                className="border-red-300 text-red-900 hover:bg-red-100"
              >
                Reset Calculator
              </Button>
              <Button 
                onClick={() => window.location.href = '/tools'}
                variant="default"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Reload Page
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default CalculatorErrorBoundary;
