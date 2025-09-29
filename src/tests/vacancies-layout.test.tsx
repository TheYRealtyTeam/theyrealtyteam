import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Vacancies from '@/pages/Vacancies';

describe('Vacancies nested in PageLayout', () => {
  it('renders navbar/footer, heading, and appfolio root', () => {
    const { container } = render(
      <MemoryRouter>
        <Vacancies />
      </MemoryRouter>
    );

    // Navbar link (e.g., Home) should be present
    expect(screen.getByRole('link', { name: /home/i })).toBeTruthy();

    // Page heading (h1 "Available Rental Units" from PageLayout)
    expect(screen.getByRole('heading', { name: /available rental units/i, level: 1 })).toBeTruthy();

    // AppFolio mount container
    expect(container.querySelector('#appfolio-root')).toBeTruthy();
  });

  it('displays the Current Listings subheader', () => {
    render(
      <MemoryRouter>
        <Vacancies />
      </MemoryRouter>
    );

    const header = screen.getByRole('heading', { name: /current listings/i, level: 2 });
    expect(header).toBeInTheDocument();
  });

  it('contains the appfolio-root container', () => {
    render(
      <MemoryRouter>
        <Vacancies />
      </MemoryRouter>
    );

    const appfolioContainer = document.getElementById('appfolio-root');
    expect(appfolioContainer).toBeInTheDocument();
    expect(appfolioContainer).toHaveClass('z-0');
  });

  it('displays breadcrumb trail', () => {
    render(
      <MemoryRouter>
        <Vacancies />
      </MemoryRouter>
    );

    expect(screen.getByText('Vacancies')).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    render(
      <MemoryRouter>
        <Vacancies />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading available units/i)).toBeInTheDocument();
  });

  it('focuses on subheading on mount for accessibility', async () => {
    render(
      <MemoryRouter>
        <Vacancies />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { name: /current listings/i, level: 2 });
    
    await waitFor(() => {
      expect(document.activeElement).toBe(heading);
    });
  });

  it('wraps AppFolio content in a card with proper styling', () => {
    render(
      <MemoryRouter>
        <Vacancies />
      </MemoryRouter>
    );

    const appfolioContainer = document.getElementById('appfolio-root');
    expect(appfolioContainer).toBeInTheDocument();
    expect(appfolioContainer).toHaveClass('z-0');
    expect(appfolioContainer).toHaveAttribute('role', 'region');
    expect(appfolioContainer).toHaveAttribute('aria-label', 'Property listings');
  });

  it('includes aria-labels on interactive elements', () => {
    render(
      <MemoryRouter>
        <Vacancies />
      </MemoryRouter>
    );

    const backButton = screen.getByRole('button', { name: /navigate back to home page/i });
    expect(backButton).toBeInTheDocument();
  });

  it('renders footer with site chrome', () => {
    render(
      <MemoryRouter>
        <Vacancies />
      </MemoryRouter>
    );

    // Footer should contain copyright text
    expect(screen.getByText(/Y Realty Team. All rights reserved/i)).toBeInTheDocument();
    
    // Footer should have contact information
    expect(screen.getByText(/info@theYteam.co/i)).toBeInTheDocument();
  });
});
