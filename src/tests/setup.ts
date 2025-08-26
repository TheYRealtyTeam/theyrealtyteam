import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Make vi available globally for tests
global.vi = vi;

// Mock IntersectionObserver with proper implementation
global.IntersectionObserver = class IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    // Mock implementation
  }

  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};

// Mock ResizeObserver with proper implementation
global.ResizeObserver = class ResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    // Mock implementation
  }
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock scrollTo
window.scrollTo = () => {};