import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Vacancies from '@/pages/Vacancies';

describe('Vacancies Page Layout', () => {
  it('renders with navbar and footer via PageLayout', () => {
    render(
      <BrowserRouter>
        <Vacancies />
      </BrowserRouter>
    );

    // Check for breadcrumb navigation
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('displays the Current Listings header', () => {
    render(
      <BrowserRouter>
        <Vacancies />
      </BrowserRouter>
    );

    const header = screen.getByRole('heading', { name: /current listings/i, level: 1 });
    expect(header).toBeInTheDocument();
  });

  it('contains the appfolio-root container', () => {
    render(
      <BrowserRouter>
        <Vacancies />
      </BrowserRouter>
    );

    const appfolioContainer = document.getElementById('appfolio-root');
    expect(appfolioContainer).toBeInTheDocument();
    expect(appfolioContainer).toHaveClass('z-0'); // Ensure z-index is set
  });

  it('displays breadcrumb trail', () => {
    render(
      <BrowserRouter>
        <Vacancies />
      </BrowserRouter>
    );

    expect(screen.getByText('Vacancies')).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    render(
      <BrowserRouter>
        <Vacancies />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading available units/i)).toBeInTheDocument();
  });

  it('focuses on H1 heading on mount for accessibility', async () => {
    render(
      <BrowserRouter>
        <Vacancies />
      </BrowserRouter>
    );

    const heading = screen.getByRole('heading', { name: /current listings/i, level: 1 });
    
    await waitFor(() => {
      expect(document.activeElement).toBe(heading);
    });
  });

  it('wraps AppFolio content in a card with proper styling', () => {
    render(
      <BrowserRouter>
        <Vacancies />
      </BrowserRouter>
    );

    const appfolioContainer = document.getElementById('appfolio-root');
    expect(appfolioContainer).toBeInTheDocument();
    expect(appfolioContainer).toHaveClass('z-0');
    expect(appfolioContainer).toHaveAttribute('role', 'region');
    expect(appfolioContainer).toHaveAttribute('aria-label', 'Property listings');
  });

  it('includes aria-labels on interactive elements', () => {
    render(
      <BrowserRouter>
        <Vacancies />
      </BrowserRouter>
    );

    const backButton = screen.getByRole('button', { name: /navigate back to home page/i });
    expect(backButton).toBeInTheDocument();
  });
});
