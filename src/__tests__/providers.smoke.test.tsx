/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

// Smoke test that Navbar renders inside a Router without errors
it('renders Navbar inside MemoryRouter', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
});

// Smoke test that basic Carousel renders on client
it('renders Carousel client-side', () => {
  render(
    <div>
      <Carousel>
        <CarouselContent>
          <CarouselItem>One</CarouselItem>
          <CarouselItem>Two</CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
});
