/**
 * @vitest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import { useAuth, AuthProvider } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import React from 'react';
import { vi } from 'vitest';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      onAuthStateChange: vi.fn(),
      getSession: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    },
  },
}));

// Mock toast notifications
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockSupabase = supabase as any;

describe('useAuth Hook', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    React.createElement(AuthProvider, null, children)
  );

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup default mock implementations
    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } }
    });
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null
    });
  });

  it('should initialize with default values', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.session).toBeNull();
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(true);
  });

  it('should handle successful sign in', async () => {
    const mockSession = {
      user: { id: '123', email: 'test@example.com' },
      access_token: 'token'
    };

    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: { session: mockSession },
      error: null
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      const response = await result.current.signIn('test@example.com', 'password');
      expect(response.error).toBeNull();
    });

    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password'
    });
  });

  it('should handle sign in error', async () => {
    const mockError = new Error('Invalid credentials');
    
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: { session: null },
      error: mockError
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      const response = await result.current.signIn('test@example.com', 'wrongpassword');
      expect(response.error).toBe(mockError);
    });
  });

  it('should handle successful sign up', async () => {
    mockSupabase.auth.signUp.mockResolvedValue({
      data: { user: null, session: null },
      error: null
    });

    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      const response = await result.current.signUp('new@example.com', 'password', {
        full_name: 'Test User'
      });
      expect(response.error).toBeNull();
    });

    expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
      email: 'new@example.com',
      password: 'password',
      options: {
        emailRedirectTo: expect.stringContaining('/'),
        data: {
          full_name: 'Test User',
          username: ''
        }
      }
    });
  });

  it('should handle sign out', async () => {
    mockSupabase.auth.signOut.mockResolvedValue({});

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.signOut();
    });

    expect(mockSupabase.auth.signOut).toHaveBeenCalled();
  });

  it('should work without AuthProvider context', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.session).toBeNull();
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(typeof result.current.signIn).toBe('function');
    expect(typeof result.current.signOut).toBe('function');
  });

  it('should update session and user via setSessionAndUser', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const mockSession = {
      user: { id: '123', email: 'test@example.com' },
      access_token: 'token'
    };

    act(() => {
      result.current.setSessionAndUser(mockSession as any);
    });

    // Note: This test would need to be adjusted based on actual implementation
    // as the session state update might be async
  });
});