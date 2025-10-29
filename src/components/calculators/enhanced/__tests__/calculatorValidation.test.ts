/**
 * Comprehensive Calculator Validation Tests
 * Run these tests to ensure all calculations are accurate
 */

import { describe, it, expect } from 'vitest';
import { 
  testMortgageCalculation, 
  testROICalculation, 
  testCashFlowCalculation,
  runCalculatorTests,
  validateCalculatorInputs
} from '@/lib/utils/calculatorTesting';

describe('Calculator Accuracy Tests', () => {
  describe('Mortgage Calculations', () => {
    it('should correctly calculate 30-year mortgage at 4.5%', () => {
      const result = testMortgageCalculation(240000, 4.5, 30, 1216.04);
      expect(result.passed).toBe(true);
    });

    it('should correctly calculate 15-year mortgage at 3.5%', () => {
      const result = testMortgageCalculation(300000, 3.5, 15, 2144.65);
      expect(result.passed).toBe(true);
    });

    it('should handle zero interest rate', () => {
      const result = testMortgageCalculation(120000, 0, 10, 1000);
      expect(result.passed).toBe(true);
    });
  });

  describe('ROI Calculations', () => {
    it('should correctly calculate 50% ROI', () => {
      const result = testROICalculation(50000, 100000, 50);
      expect(result.passed).toBe(true);
    });

    it('should handle zero investment', () => {
      const result = testROICalculation(10000, 0, 0);
      expect(result.passed).toBe(true);
    });
  });

  describe('Cash Flow Calculations', () => {
    it('should correctly calculate positive cash flow', () => {
      const result = testCashFlowCalculation(2000, 1500, 500);
      expect(result.passed).toBe(true);
    });

    it('should correctly calculate negative cash flow', () => {
      const result = testCashFlowCalculation(1000, 1500, -500);
      expect(result.passed).toBe(true);
    });
  });

  describe('Input Validation', () => {
    it('should validate correct inputs', () => {
      const result = validateCalculatorInputs({
        propertyValue: 300000,
        downPaymentPercent: 20,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2000
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject invalid property value', () => {
      const result = validateCalculatorInputs({
        propertyValue: -10000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject invalid down payment percent', () => {
      const result = validateCalculatorInputs({
        downPaymentPercent: 150
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject invalid interest rate', () => {
      const result = validateCalculatorInputs({
        interestRate: -5
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Comprehensive Test Suite', () => {
    it('should pass all calculator tests', () => {
      const results = runCalculatorTests();
      const allPassed = results.every(r => r.passed);
      expect(allPassed).toBe(true);
    });
  });
});
