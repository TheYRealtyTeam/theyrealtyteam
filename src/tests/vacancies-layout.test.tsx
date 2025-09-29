import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Vacancies from '@/pages/Vacancies';

describe('Vacancies layout integration', () => {
  it('renders navbar/footer, heading, and appfolio root', () => {
    const { container } = render(
      <BrowserRouter>
        <Vacancies />
      </BrowserRouter>
    );

    // Navbar link (e.g., Home) should be present
    expect(screen.getByRole('link', { name: /home/i })).toBeTruthy();

    // Page heading
    expect(screen.getByRole('heading', { name: /current listings/i })).toBeTruthy();

    // AppFolio mount container
    expect(container.querySelector('#appfolio-root')).toBeTruthy();
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
