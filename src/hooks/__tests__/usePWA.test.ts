/**
 * @vitest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { usePWA } from '@/hooks/usePWA';

// Minimal SW mock
const mockSW = { register: vi.fn().mockResolvedValue({}) };
Object.defineProperty(navigator, 'serviceWorker', { writable: true, value: mockSW });

// Silence logs in tests
vi.spyOn(console, 'log').mockImplementation(() => {});
vi.spyOn(console, 'error').mockImplementation(() => {});

describe('usePWA hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(navigator, 'onLine', { writable: true, value: true });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((q: string) => ({
        matches: false,
        media: q,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('initializes defaults and responds to offline/online', () => {
    const { result } = renderHook(() => usePWA());
    expect(result.current.isOffline).toBe(false);

    act(() => window.dispatchEvent(new Event('offline')));
    expect(result.current.isOffline).toBe(true);

    act(() => window.dispatchEvent(new Event('online')));
    expect(result.current.isOffline).toBe(false);
  });

  it('captures beforeinstallprompt and allows promptInstall()', async () => {
    const { result } = renderHook(() => usePWA());

    const mockEvent: any = new Event('beforeinstallprompt');
    mockEvent.prompt = vi.fn().mockResolvedValue(undefined);
    mockEvent.userChoice = Promise.resolve({ outcome: 'accepted', platform: 'web' });

    act(() => window.dispatchEvent(mockEvent));
    expect(result.current.isInstallable).toBe(true);

    let ok: boolean;
    await act(async () => {
      ok = await result.current.promptInstall();
    });
    expect(ok!).toBe(true);
  });
});
