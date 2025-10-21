import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useProperties } from '../useProperties';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Mock Supabase
const mockSelect = vi.fn();
const mockInsert = vi.fn();
const mockUpdate = vi.fn();
const mockDelete = vi.fn();
const mockEq = vi.fn();
const mockOrder = vi.fn();

const mockFrom = vi.fn(() => ({
  select: mockSelect,
  insert: mockInsert,
  update: mockUpdate,
  delete: mockDelete
}));

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: mockFrom,
    auth: {
      getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } }))
    }
  }
}));

// Mock toast
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

describe('useProperties', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
      }
    });
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup default mock chain
    mockEq.mockReturnValue({
      order: mockOrder
    });
    mockOrder.mockResolvedValue({ data: [], error: null });
    mockSelect.mockReturnValue({
      eq: mockEq
    });
  });

  it('fetches properties successfully', async () => {
    const mockProperties = [
      {
        id: '1',
        title: 'Test Property',
        property_type: 'apartment',
        price: 1000,
        active: true,
        created_at: '2024-01-01'
      }
    ];

    mockOrder.mockResolvedValueOnce({ data: mockProperties, error: null });

    const { result } = renderHook(() => useProperties(), { wrapper });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.properties).toEqual(mockProperties);
    expect(result.current.error).toBeNull();
  });

  it('handles fetch errors gracefully', async () => {
    const mockError = { message: 'Database connection failed' };
    mockOrder.mockResolvedValueOnce({ data: null, error: mockError });

    const { result } = renderHook(() => useProperties(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(mockError.message);
    expect(result.current.properties).toEqual([]);
  });

  it('filters only active properties', async () => {
    const { result } = renderHook(() => useProperties(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Verify the query filters for active: true
    expect(mockEq).toHaveBeenCalledWith('active', true);
  });
});