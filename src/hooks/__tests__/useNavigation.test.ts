/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useNavigation } from '@/components/navbar/useNavigation';

describe('useNavigation (smoke)', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    React.createElement(MemoryRouter, { initialEntries: ['/'] }, children)
  );

  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    document.body.style.overflow = '';
  });

  it('initializes and toggles menu', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });
    expect(result.current.isMenuOpen).toBe(false);

    act(() => result.current.toggleMenu());
    expect(result.current.isMenuOpen).toBe(true);

    act(() => result.current.closeMenu());
    expect(result.current.isMenuOpen).toBe(false);
  });
});
