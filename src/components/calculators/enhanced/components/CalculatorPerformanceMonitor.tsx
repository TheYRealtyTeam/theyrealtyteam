import { useEffect, useRef } from 'react';

interface PerformanceMonitorProps {
  calculatorName: string;
  isCalculating: boolean;
}

/**
 * Development-only component to monitor calculator performance
 * Reports slow calculations (>100ms) to console
 */
const CalculatorPerformanceMonitor = ({ calculatorName, isCalculating }: PerformanceMonitorProps) => {
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    if (isCalculating) {
      startTimeRef.current = performance.now();
    } else if (startTimeRef.current > 0) {
      const duration = performance.now() - startTimeRef.current;
      
      if (duration > 100) {
        console.warn(`⚠️ ${calculatorName}: Slow calculation detected (${duration.toFixed(2)}ms)`);
      }
      
      startTimeRef.current = 0;
    }
  }, [isCalculating, calculatorName]);

  return null; // This component doesn't render anything
};

export default CalculatorPerformanceMonitor;
