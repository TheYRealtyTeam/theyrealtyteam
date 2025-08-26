/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import { useIsMobileOptimized } from '@/hooks/useIsMobileOptimized';

// Mock window.innerWidth and window.innerHeight
const mockResizeEvent = () => {
  const resizeEvent = new Event('resize');
  window.dispatchEvent(resizeEvent);
};

const mockWindowSize = (width: number, height: number = 800) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
};

describe('useIsMobileOptimized Hook', () => {
  beforeEach(() => {
    // Reset to desktop size by default
    mockWindowSize(1200, 800);
  });

  afterEach(() => {
    // Clean up any event listeners
    jest.clearAllMocks();
  });

  it('should initialize with desktop values for desktop screen', () => {
    mockWindowSize(1200, 800);
    
    const { result } = renderHook(() => useIsMobileOptimized());

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(true);
    expect(result.current.screenSize).toEqual({ width: 1200, height: 800 });
    expect(result.current.isSmallMobile).toBe(false);
    expect(result.current.isLargeMobile).toBe(false);
    expect(result.current.isMobileOnly).toBe(false);
    expect(result.current.isTabletOrDesktop).toBe(true);
  });

  it('should detect mobile screen (< 768px)', () => {
    mockWindowSize(375, 800);
    
    const { result } = renderHook(() => useIsMobileOptimized());

    act(() => {
      mockResizeEvent();
    });

    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.screenSize).toEqual({ width: 375, height: 800 });
    expect(result.current.isSmallMobile).toBe(false);
    expect(result.current.isLargeMobile).toBe(true);
    expect(result.current.isMobileOnly).toBe(true);
    expect(result.current.isTabletOrDesktop).toBe(false);
  });

  it('should detect small mobile screen (< 375px)', () => {
    mockWindowSize(320, 600);
    
    const { result } = renderHook(() => useIsMobileOptimized());

    act(() => {
      mockResizeEvent();
    });

    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.screenSize).toEqual({ width: 320, height: 600 });
    expect(result.current.isSmallMobile).toBe(true);
    expect(result.current.isLargeMobile).toBe(false);
    expect(result.current.isMobileOnly).toBe(true);
    expect(result.current.isTabletOrDesktop).toBe(false);
  });

  it('should detect tablet screen (768px - 1023px)', () => {
    mockWindowSize(768, 1024);
    
    const { result } = renderHook(() => useIsMobileOptimized());

    act(() => {
      mockResizeEvent();
    });

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.screenSize).toEqual({ width: 768, height: 1024 });
    expect(result.current.isSmallMobile).toBe(false);
    expect(result.current.isLargeMobile).toBe(false);
    expect(result.current.isMobileOnly).toBe(false);
    expect(result.current.isTabletOrDesktop).toBe(true);
  });

  it('should detect tablet at upper boundary (1023px)', () => {
    mockWindowSize(1023, 800);
    
    const { result } = renderHook(() => useIsMobileOptimized());

    act(() => {
      mockResizeEvent();
    });

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isDesktop).toBe(false);
  });

  it('should detect desktop at breakpoint (1024px)', () => {
    mockWindowSize(1024, 800);
    
    const { result } = renderHook(() => useIsMobileOptimized());

    act(() => {
      mockResizeEvent();
    });

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(true);
  });

  it('should respond to window resize events', () => {
    mockWindowSize(1200, 800);
    const { result } = renderHook(() => useIsMobileOptimized());

    // Initially desktop
    expect(result.current.isDesktop).toBe(true);

    // Resize to mobile
    act(() => {
      mockWindowSize(375, 800);
      mockResizeEvent();
    });

    expect(result.current.isMobile).toBe(true);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.screenSize).toEqual({ width: 375, height: 800 });

    // Resize to tablet
    act(() => {
      mockWindowSize(768, 1024);
      mockResizeEvent();
    });

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.screenSize).toEqual({ width: 768, height: 1024 });

    // Resize back to desktop
    act(() => {
      mockWindowSize(1400, 900);
      mockResizeEvent();
    });

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(true);
    expect(result.current.screenSize).toEqual({ width: 1400, height: 900 });
  });

  it('should handle edge case at mobile breakpoint (767px)', () => {
    mockWindowSize(767, 800);
    
    const { result } = renderHook(() => useIsMobileOptimized());

    act(() => {
      mockResizeEvent();
    });

    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
  });

  it('should handle edge case at tablet breakpoint (768px)', () => {
    mockWindowSize(768, 800);
    
    const { result } = renderHook(() => useIsMobileOptimized());

    act(() => {
      mockResizeEvent();
    });

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
  });

  it('should update screen dimensions correctly', () => {
    const { result } = renderHook(() => useIsMobileOptimized());

    act(() => {
      mockWindowSize(1920, 1080);
      mockResizeEvent();
    });

    expect(result.current.screenSize).toEqual({ width: 1920, height: 1080 });

    act(() => {
      mockWindowSize(414, 896); // iPhone 11 Pro Max
      mockResizeEvent();
    });

    expect(result.current.screenSize).toEqual({ width: 414, height: 896 });
  });
});