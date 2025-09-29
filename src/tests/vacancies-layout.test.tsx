import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});
