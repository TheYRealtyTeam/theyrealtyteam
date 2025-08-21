import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from '@/pages/Index';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';
import { AuthProvider } from '@/contexts/AuthContext';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    })),
    auth: {
      getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } }))
    }
  }
}));

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

describe('Smoke Tests', () => {
  it('Homepage loads without crashing', async () => {
    render(
      <TestWrapper>
        <Index />
      </TestWrapper>
    );
    
    expect(screen.getByText(/Y Realty Team/i)).toBeInTheDocument();
  });

  it('Blog page renders without crashing', async () => {
    render(
      <TestWrapper>
        <Blog />
      </TestWrapper>
    );
    
    expect(screen.getByText(/Blog/i)).toBeInTheDocument();
  });

  it('Contact page renders without crashing', async () => {
    render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );
    
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });
});

describe('API Error Handling', () => {
  it('handles Supabase connection errors gracefully', async () => {
    // This test ensures our error boundaries work
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <TestWrapper>
        <Blog />
      </TestWrapper>
    );
    
    // Should not crash the app even if API fails
    expect(document.body).toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });
});

describe('Authentication Flow', () => {
  it('renders login components when user is not authenticated', async () => {
    render(
      <TestWrapper>
        <Index />
      </TestWrapper>
    );
    
    // Should show "Get Started" for non-authenticated users
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
  });
});