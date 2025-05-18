
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AppointmentStep } from '../types';

export const useStepNavigation = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<AppointmentStep>('dateSelection');

  // Step navigation functions
  const goToNextStep = (isValid: boolean) => {
    if (currentStep === 'dateSelection') {
      if (!isValid) {
        toast({
          title: "Incomplete Selection",
          description: "Please select a date, time, and call type before continuing.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep('personalInfo');
    }
  };

  const goToPreviousStep = () => {
    if (currentStep === 'personalInfo') {
      setCurrentStep('dateSelection');
    }
  };

  return {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    setCurrentStep
  };
};
