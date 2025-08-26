/**
 * @jest-environment jsdom
 */
import { renderHook, act, waitFor } from '@testing-library/react';
import { usePWA } from '@/hooks/usePWA';

// Mock service worker registration
const mockServiceWorkerRegistration = {
  register: jest.fn(),
};

Object.defineProperty(navigator, 'serviceWorker', {
  writable: true,
  value: mockServiceWorkerRegistration,
});

// Mock console methods to avoid noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
};

// Mock BeforeInstallPromptEvent
interface MockBeforeInstallPromptEvent extends Event {
  prompt: jest.MockedFunction<() => Promise<void>>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

describe('usePWA Hook', () => {
  let mockBeforeInstallPrompt: MockBeforeInstallPromptEvent;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });

    // Reset matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    // Mock service worker registration success
    mockServiceWorkerRegistration.register.mockResolvedValue({});

    // Create mock event
    mockBeforeInstallPrompt = {
      prompt: jest.fn().mockResolvedValue(undefined),
      userChoice: Promise.resolve({ outcome: 'accepted' as const, platform: 'web' }),
      preventDefault: jest.fn(),
      type: 'beforeinstallprompt',
      bubbles: false,
      cancelable: true,
      composed: false,
      currentTarget: null,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: true,
      returnValue: true,
      srcElement: null,
      target: null,
      timeStamp: Date.now(),
      composedPath: jest.fn(() => []),
      initEvent: jest.fn(),
      stopImmediatePropagation: jest.fn(),
      stopPropagation: jest.fn(),
      NONE: 0,
      CAPTURING_PHASE: 1,
      AT_TARGET: 2,
      BUBBLING_PHASE: 3,
    };
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => usePWA());

    expect(result.current.isInstallable).toBe(false);
    expect(result.current.isInstalled).toBe(false);
    expect(result.current.isOffline).toBe(false);
    expect(typeof result.current.promptInstall).toBe('function');
  });

  it('should detect offline status correctly', () => {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false,
    });

    const { result } = renderHook(() => usePWA());

    expect(result.current.isOffline).toBe(true);
  });

  it('should handle beforeinstallprompt event', async () => {
    const { result } = renderHook(() => usePWA());

    act(() => {
      window.dispatchEvent(mockBeforeInstallPrompt);
    });

    await waitFor(() => {
      expect(result.current.isInstallable).toBe(true);
    });
  });

  it('should handle successful app installation', async () => {
    const { result } = renderHook(() => usePWA());

    // First, make app installable
    act(() => {
      window.dispatchEvent(mockBeforeInstallPrompt);
    });

    await waitFor(() => {
      expect(result.current.isInstallable).toBe(true);
    });

    // Then trigger app installed event
    act(() => {
      const installedEvent = new Event('appinstalled');
      window.dispatchEvent(installedEvent);
    });

    await waitFor(() => {
      expect(result.current.isInstalled).toBe(true);
      expect(result.current.isInstallable).toBe(false);
    });
  });

  it('should handle online/offline events', async () => {
    const { result } = renderHook(() => usePWA());

    expect(result.current.isOffline).toBe(false);

    act(() => {
      const offlineEvent = new Event('offline');
      window.dispatchEvent(offlineEvent);
    });

    await waitFor(() => {
      expect(result.current.isOffline).toBe(true);
    });

    act(() => {
      const onlineEvent = new Event('online');
      window.dispatchEvent(onlineEvent);
    });

    await waitFor(() => {
      expect(result.current.isOffline).toBe(false);
    });
  });

  it('should detect installed app via display mode', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(display-mode: standalone)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => usePWA());

    expect(result.current.isInstalled).toBe(true);
  });

  it('should detect installed app via navigator.standalone', () => {
    (navigator as any).standalone = true;

    const { result } = renderHook(() => usePWA());

    expect(result.current.isInstalled).toBe(true);
  });

  it('should handle promptInstall with accepted outcome', async () => {
    const { result } = renderHook(() => usePWA());

    // First, make app installable
    act(() => {
      window.dispatchEvent(mockBeforeInstallPrompt);
    });

    await waitFor(() => {
      expect(result.current.isInstallable).toBe(true);
    });

    mockBeforeInstallPrompt.userChoice = Promise.resolve({ 
      outcome: 'accepted' as const, 
      platform: 'web' 
    });

    let installResult;
    await act(async () => {
      installResult = await result.current.promptInstall();
    });

    expect(installResult).toBe(true);
    expect(mockBeforeInstallPrompt.prompt).toHaveBeenCalled();
  });

  it('should handle promptInstall with dismissed outcome', async () => {
    const { result } = renderHook(() => usePWA());

    // First, make app installable
    act(() => {
      window.dispatchEvent(mockBeforeInstallPrompt);
    });

    await waitFor(() => {
      expect(result.current.isInstallable).toBe(true);
    });

    mockBeforeInstallPrompt.userChoice = Promise.resolve({ 
      outcome: 'dismissed' as const, 
      platform: 'web' 
    });

    let installResult;
    await act(async () => {
      installResult = await result.current.promptInstall();
    });

    expect(installResult).toBe(false);
  });

  it('should handle promptInstall when not installable', async () => {
    const { result } = renderHook(() => usePWA());

    const installResult = await act(async () => {
      return await result.current.promptInstall();
    });

    expect(installResult).toBe(false);
  });

  it('should handle promptInstall error', async () => {
    const { result } = renderHook(() => usePWA());

    // First, make app installable
    act(() => {
      window.dispatchEvent(mockBeforeInstallPrompt);
    });

    await waitFor(() => {
      expect(result.current.isInstallable).toBe(true);
    });

    mockBeforeInstallPrompt.prompt.mockRejectedValue(new Error('Install failed'));

    let installResult;
    await act(async () => {
      installResult = await result.current.promptInstall();
    });

    expect(installResult).toBe(false);
    expect(console.error).toHaveBeenCalledWith('Error during install prompt:', expect.any(Error));
  });

  it('should register service worker when available', async () => {
    renderHook(() => usePWA());

    await waitFor(() => {
      expect(mockServiceWorkerRegistration.register).toHaveBeenCalledWith('/sw.js');
    });
  });

  it('should handle service worker registration failure', async () => {
    const mockError = new Error('SW registration failed');
    mockServiceWorkerRegistration.register.mockRejectedValue(mockError);

    renderHook(() => usePWA());

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith('SW registration failed: ', mockError);
    });
  });
});