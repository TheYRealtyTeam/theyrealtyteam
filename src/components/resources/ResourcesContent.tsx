
import React from 'react';
import { Download, FileText, Book, Newspaper } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const ResourcesContent = () => {
  // Handler for download button clicks
  const handleDownload = (resourceName: string) => {
    // In a real application, this would trigger an actual download
    // For now, we'll just show a toast notification
    toast({
      title: "Download initiated",
      description: `${resourceName} will download shortly.`,
    });
  };

  const resources = [
    {
      id: 1,
      title: "2025 Property Investment Guide",
      description: "A comprehensive guide to investing in rental properties in the current market with projected ROI data.",
      type: "guide",
      icon: <Book className="h-8 w-8 text-yrealty-navy" />,
      downloadText: "Download PDF (2.4 MB)"
    },
    {
      id: 2,
      title: "Rental Property Tax Deduction Checklist",
      description: "Never miss a deduction with our comprehensive tax checklist specially designed for rental property owners.",
      type: "checklist",
      icon: <FileText className="h-8 w-8 text-yrealty-navy" />,
      downloadText: "Download PDF (1.1 MB)"
    },
    {
      id: 3,
      title: "Tenant Screening Template",
      description: "A ready-to-use template with all the essential questions to properly screen potential tenants.",
      type: "template",
      icon: <FileText className="h-8 w-8 text-yrealty-navy" />,
      downloadText: "Download DOCX (820 KB)"
    },
    {
      id: 4,
      title: "2025 Market Analysis Report",
      description: "In-depth analysis of current market conditions and predictions for the coming year for property investors.",
      type: "report",
      icon: <Newspaper className="h-8 w-8 text-yrealty-navy" />,
      downloadText: "Download PDF (3.2 MB)"
    },
    {
      id: 5,
      title: "Property Maintenance Schedule Template",
      description: "Keep your properties in top condition with this yearly maintenance schedule template.",
      type: "template",
      icon: <FileText className="h-8 w-8 text-yrealty-navy" />,
      downloadText: "Download XLSX (780 KB)"
    },
    {
      id: 6,
      title: "Smart Home Upgrade ROI Calculator",
      description: "Interactive spreadsheet to calculate return on investment for various smart home upgrades.",
      type: "tool",
      icon: <FileText className="h-8 w-8 text-yrealty-navy" />,
      downloadText: "Download XLSX (950 KB)"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'guide', label: 'Guides' },
    { id: 'checklist', label: 'Checklists' },
    { id: 'template', label: 'Templates' },
    { id: 'report', label: 'Reports' },
    { id: 'tool', label: 'Tools' }
  ];

  return (
    <div className="space-y-10">
      <div className="text-center">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-white text-gray-700 hover:bg-gray-100"
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Card key={resource.id} className="reveal overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                {resource.icon}
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">{resource.type}</span>
              </div>
              <CardTitle className="text-xl mt-2">{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 hover:bg-yrealty-blue hover:text-yrealty-navy"
                onClick={() => handleDownload(resource.title)}
              >
                <Download className="h-4 w-4" /> 
                {resource.downloadText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="max-w-2xl mx-auto mt-16 p-6 bg-yrealty-blue rounded-lg">
        <h3 className="text-xl font-bold mb-3 text-center">Need Custom Resources?</h3>
        <p className="text-center mb-6">Our team can create customized reports and analysis tailored to your specific property portfolio needs.</p>
        <div className="flex justify-center">
          <Button className="bg-yrealty-navy hover:bg-yrealty-navy/90">Request Custom Resources</Button>
        </div>
      </div>
    </div>
  );
};

export default ResourcesContent;
