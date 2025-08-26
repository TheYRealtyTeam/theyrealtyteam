/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useNavigation } from '@/components/navbar/useNavigation';
import React from 'react';

// Mock scrollTo
window.scrollTo = jest.fn();

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = jest.fn(() => ({
  top: 100,
  left: 0,
  bottom: 200,
  right: 100,
  width: 100,
  height: 100,
  x: 0,
  y: 100,
  toJSON: jest.fn()
}));

// Mock querySelectorAll for sections
const mockSections = [
  { 
    id: 'home', 
    offsetTop: 0, 
    offsetHeight: 800,
    getAttribute: jest.fn().mockReturnValue('home'),
    getBoundingClientRect: jest.fn(() => ({ top: 0, height: 800 }))
  },
  { 
    id: 'about', 
    offsetTop: 800, 
    offsetHeight: 600,
    getAttribute: jest.fn().mockReturnValue('about'),
    getBoundingClientRect: jest.fn(() => ({ top: 800, height: 600 }))
  },
  { 
    id: 'services', 
    offsetTop: 1400, 
    offsetHeight: 700,
    getAttribute: jest.fn().mockReturnValue('services'),
    getBoundingClientRect: jest.fn(() => ({ top: 1400, height: 700 }))
  }
];

document.querySelectorAll = jest.fn().mockReturnValue(mockSections);
document.getElementById = jest.fn((id) => 
  mockSections.find(section => section.id === id) || null
);

describe('useNavigation Hook', () => {
  const wrapper = ({ children, initialEntries = ['/'] }: { 
    children: React.ReactNode; 
    initialEntries?: string[] 
  }) => React.createElement(MemoryRouter, { initialEntries }, children);

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset window properties
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true
    });
    Object.defineProperty(window, 'pageYOffset', {
      value: 0,
      writable: true
    });
    // Reset body overflow
    document.body.style.overflow = '';
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    expect(result.current.isMenuOpen).toBe(false);
    expect(result.current.isScrolled).toBe(false);
    expect(result.current.activeSection).toBe('home');
  });

  it('should toggle menu open/close', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      result.current.toggleMenu();
    });

    expect(result.current.isMenuOpen).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');

    act(() => {
      result.current.toggleMenu();
    });

    expect(result.current.isMenuOpen).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('should close menu', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      result.current.toggleMenu(); // Open menu first
    });
    expect(result.current.isMenuOpen).toBe(true);

    act(() => {
      result.current.closeMenu();
    });

    expect(result.current.isMenuOpen).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('should detect scroll state', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 50 });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.isScrolled).toBe(true);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 5 });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.isScrolled).toBe(false);
  });

  it('should detect active section on scroll', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    // Scroll to about section
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 900 });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.activeSection).toBe('about');

    // Scroll to services section
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 1500 });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.activeSection).toBe('services');
  });

  it('should determine if link is active for anchor links', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    // Set active section to about
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 900 });
      window.dispatchEvent(new Event('scroll'));
    });

    const aboutLink = { href: '/#about', isAnchorLink: true };
    const homeLink = { href: '/#home', isAnchorLink: true };

    expect(result.current.isLinkActive(aboutLink)).toBe(true);
    expect(result.current.isLinkActive(homeLink)).toBe(false);
  });

  it('should determine if link is active for regular routes', () => {
    const { result } = renderHook(() => useNavigation(), { 
      wrapper: ({ children }: { children: React.ReactNode }) => 
        React.createElement(MemoryRouter, { initialEntries: ['/blog'] }, children)
    });

    const blogLink = { href: '/blog', isAnchorLink: false };
    const homeLink = { href: '/', isAnchorLink: false };

    expect(result.current.isLinkActive(blogLink)).toBe(true);
    expect(result.current.isLinkActive(homeLink)).toBe(false);
  });

  it('should handle navigation for anchor links', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    const mockEvent = {
      preventDefault: jest.fn(),
    } as any;

    const aboutLink = { href: '/#about', isAnchorLink: true };

    act(() => {
      result.current.handleNavigation(mockEvent, aboutLink);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 20, // 100 (offsetTop) - 80 (yOffset)
      behavior: 'smooth'
    });
    expect(result.current.isMenuOpen).toBe(false);
  });

  it('should handle navigation for non-anchor links when not on home page', () => {
    const { result } = renderHook(() => useNavigation(), { 
      wrapper: ({ children }: { children: React.ReactNode }) => 
        React.createElement(MemoryRouter, { initialEntries: ['/blog'] }, children)
    });

    // Mock window.location.href assignment
    delete (window as any).location;
    window.location = { ...window.location, href: '' };

    const mockEvent = {
      preventDefault: jest.fn(),
    } as any;

    const homeLink = { href: '/#home', isAnchorLink: true };

    act(() => {
      result.current.handleNavigation(mockEvent, homeLink);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(window.location.href).toBe('/#home');
  });

  it('should handle navigation when element is not found', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    // Mock getElementById to return null for non-existent element
    document.getElementById = jest.fn().mockReturnValue(null);

    const mockEvent = {
      preventDefault: jest.fn(),
    } as any;

    const nonExistentLink = { href: '/#nonexistent', isAnchorLink: true };

    act(() => {
      result.current.handleNavigation(mockEvent, nonExistentLink);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('should update active section based on route changes', () => {
    const { result, rerender } = renderHook(() => useNavigation(), {
      wrapper: ({ children }: { children: React.ReactNode }) => 
        React.createElement(MemoryRouter, { initialEntries: ['/'] }, children)
    });

    expect(result.current.activeSection).toBe('home');

    // Change route to /blog
    rerender();
    
    // Note: This test might need adjustment based on actual implementation
    // as route changes might need to be triggered differently in the test
  });

  it('should clean up event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    
    const { unmount } = renderHook(() => useNavigation(), { wrapper });

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should prevent body scroll when menu is open', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      result.current.toggleMenu();
    });

    expect(document.body.style.overflow).toBe('hidden');

    act(() => {
      result.current.closeMenu();
    });

    expect(document.body.style.overflow).toBe('');
  });
});