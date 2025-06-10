
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ActionButtons = () => {
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    navigate('/appointment');
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
            <Button 
              onClick={handleAppointmentClick}
              className="bg-yrealty-navy hover:bg-yrealty-navy/90 text-white px-8 py-3"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Consultation
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
  );
};

export default ActionButtons;
