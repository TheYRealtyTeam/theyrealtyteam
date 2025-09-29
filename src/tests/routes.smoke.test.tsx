import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from './setup';
import Index from '@/pages/Index';
import FAQ from '@/pages/FAQ';
import Tools from '@/pages/Tools';
import Vacancies from '@/pages/Vacancies';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => ({
          eq: vi.fn(() => Promise.resolve({ data: [], error: null })),
          range: vi.fn(() => Promise.resolve({ data: [], error: null }))
        })),
        eq: vi.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    })),
    auth: {
      getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } }))
    }
  }
}));

describe('Route Smoke Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('/ - renders homepage with header and navigation', async () => {
    renderWithProviders(<Index />);
    
    // Check for navigation/header elements
    await waitFor(() => {
      expect(screen.getByText(/Y Realty Team/i)).toBeInTheDocument();
    });
    
    // Check for main content
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
  });

  it('/faq - renders FAQ page', async () => {
    renderWithProviders(<FAQ />);
    
    await waitFor(() => {
      expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();
    });
  });

  it('/tools - renders Tools/Calculators page', async () => {
    renderWithProviders(<Tools />);
    
    await waitFor(() => {
      expect(screen.getByText(/Property Investment Tools/i)).toBeInTheDocument();
    });
  });

  it('/vacancies - renders Vacancies page with AppFolio container', async () => {
    renderWithProviders(<Vacancies />);
    
    await waitFor(() => {
      // Check for page heading
      expect(screen.getByText(/Available Properties/i)).toBeInTheDocument();
    });
    
    // Check for AppFolio integration container
    const appfolioContainer = document.querySelector('.appfolio-widget-container');
    expect(appfolioContainer).toBeInTheDocument();
  });

  it('/blog - renders Blog page', async () => {
    renderWithProviders(<Blog />);
    
    await waitFor(() => {
      expect(screen.getByText(/Blog/i)).toBeInTheDocument();
    });
  });

  it('/contact - renders Contact page', async () => {
    renderWithProviders(<Contact />);
    
    await waitFor(() => {
      expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    });
  });
});