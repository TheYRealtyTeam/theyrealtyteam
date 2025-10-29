
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ActionButtonsProps {
  calculatorData?: any;
  calculatorType?: string;
}

const ActionButtons = ({ calculatorData, calculatorType = 'Investment' }: ActionButtonsProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    if (!calculatorData) {
      toast({
        title: "No data available",
        description: "Please complete the calculator first to download your analysis.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Generate report content
      const reportContent = generateReport(calculatorData, calculatorType);
      
      // Create blob and download
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${calculatorType}-Analysis-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Download successful",
        description: "Your analysis report has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading your report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    if (!calculatorData) {
      toast({
        title: "No data available",
        description: "Please complete the calculator first to share your analysis.",
        variant: "destructive",
      });
      return;
    }

    // Copy current URL to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Link copied",
        description: "Analysis link copied to clipboard. Note: Results are not saved in the URL.",
      });
    }).catch(() => {
      toast({
        title: "Share failed",
        description: "Could not copy link to clipboard.",
        variant: "destructive",
      });
    });
  };

  const generateReport = (data: any, type: string): string => {
    const date = new Date().toLocaleDateString();
    let report = `${type} ANALYSIS REPORT\n`;
    report += `Generated on: ${date}\n`;
    report += `${'='.repeat(60)}\n\n`;

    if (data.results) {
      report += `KEY METRICS\n${'-'.repeat(60)}\n`;
      const results = data.results;
      
      Object.entries(results).forEach(([key, value]) => {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        if (typeof value === 'number') {
          report += `${label}: ${formatValue(value, key)}\n`;
        }
      });
      report += '\n';
    }

    if (data.state) {
      report += `INPUT PARAMETERS\n${'-'.repeat(60)}\n`;
      const state = data.state;
      
      Object.entries(state).forEach(([key, value]) => {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        if (typeof value === 'number' || typeof value === 'boolean') {
          report += `${label}: ${formatValue(value, key)}\n`;
        }
      });
    }

    report += `\n${'='.repeat(60)}\n`;
    report += `Disclaimer: This analysis is for informational purposes only.\n`;
    report += `Consult with a qualified financial advisor before making investment decisions.\n`;

    return report;
  };

  const formatValue = (value: any, key: string): string => {
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (key.toLowerCase().includes('rate') || key.toLowerCase().includes('percent')) {
      return `${value.toFixed(2)}%`;
    }
    if (key.toLowerCase().includes('amount') || key.toLowerCase().includes('value') || 
        key.toLowerCase().includes('payment') || key.toLowerCase().includes('cost') ||
        key.toLowerCase().includes('price') || key.toLowerCase().includes('income') ||
        key.toLowerCase().includes('flow') || key.toLowerCase().includes('roi') ||
        key.toLowerCase().includes('equity')) {
      return `$${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
    }
    return value.toString();
  };
  return (
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
            
            <Button 
              variant="outline" 
              className="border-yrealty-navy text-yrealty-navy hover:bg-yrealty-navy hover:text-white px-8 py-3"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Analysis
            </Button>
            
            <Button 
              variant="outline" 
              className="border-yrealty-navy text-yrealty-navy hover:bg-yrealty-navy hover:text-white px-8 py-3"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Analysis
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionButtons;
