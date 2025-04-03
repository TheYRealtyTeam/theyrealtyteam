
import React from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import RentalPropertyCalculator from './calculators/RentalPropertyCalculator';
import MortgageCalculator from './calculators/MortgageCalculator';
import ROICalculator from './calculators/ROICalculator';

const CalculatorsSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <Tabs defaultValue="rental" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className={`flex flex-wrap ${isMobile ? 'flex-col w-full' : 'grid-cols-3'} max-w-2xl w-full`}>
              <TabsTrigger value="rental" className="flex-1">Rental Income</TabsTrigger>
              <TabsTrigger value="mortgage" className="flex-1">Mortgage</TabsTrigger>
              <TabsTrigger value="roi" className="flex-1">ROI</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="rental" className="reveal">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-yrealty-navy">Rental Income Calculator</h2>
              <p className="text-gray-600 mb-6">
                Estimate your monthly and annual rental income after expenses to better understand the cash flow from your property investment.
              </p>
              <RentalPropertyCalculator />
            </div>
          </TabsContent>
          
          <TabsContent value="mortgage" className="reveal">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-yrealty-navy">Mortgage Calculator</h2>
              <p className="text-gray-600 mb-6">
                Calculate your monthly mortgage payments based on property price, down payment, interest rate, and loan term.
              </p>
              <MortgageCalculator />
            </div>
          </TabsContent>
          
          <TabsContent value="roi" className="reveal">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-yrealty-navy">Return on Investment (ROI) Calculator</h2>
              <p className="text-gray-600 mb-6">
                Analyze the potential return on investment for a property, considering purchase price, rental income, expenses, and appreciation.
              </p>
              <ROICalculator />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold mb-4 text-yrealty-navy">Need Help Understanding Your Investment Options?</h3>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            Our team of property investment specialists can help you analyze potential investments and develop a customized strategy for your goals.
          </p>
          <Button className="bg-yrealty-navy hover:bg-yrealty-navy/90">
            <a href="#contact" className="text-white">Schedule a Consultation</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CalculatorsSection;
