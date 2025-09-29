import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useBlogPosts } from '../useBlogPosts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Mock Supabase
const mockSelect = vi.fn();
const mockFrom = vi.fn(() => ({
  select: mockSelect
}));

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: mockFrom
  }
}));

// Mock toast
vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn()
}));

describe('useBlogPosts', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
      }
    });
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches blog posts successfully', async () => {
    const mockPosts = [
      { id: '1', title: 'Test Post', content: 'Content', created_at: '2024-01-01' }
    ];

    mockSelect.mockReturnValueOnce({
      order: vi.fn().mockResolvedValue({ data: [], error: null, count: 1 })
    });

    mockSelect.mockReturnValueOnce({
      order: vi.fn(() => ({
        range: vi.fn().mockResolvedValue({ data: mockPosts, error: null })
      }))
    });

    const { result } = renderHook(
      () => useBlogPosts({ searchTerm: '', currentPage: 1, postsPerPage: 10 }),
      { wrapper }
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.blogPosts).toEqual(mockPosts);
    expect(result.current.error).toBeNull();
  });

  it('handles fetch errors gracefully', async () => {
    const mockError = { message: 'Database error' };

    mockSelect.mockReturnValueOnce({
      order: vi.fn().mockResolvedValue({ data: null, error: mockError })
    });

    const { result } = renderHook(
      () => useBlogPosts({ searchTerm: '', currentPage: 1, postsPerPage: 10 }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(mockError.message);
    expect(result.current.blogPosts).toEqual([]);
  });

  it('searches blog posts with search term', async () => {
    const mockSearchResults = [
      { id: '2', title: 'Search Result', content: 'Searched', created_at: '2024-01-02' }
    ];

    mockSelect.mockReturnValueOnce({
      or: vi.fn(() => ({
        order: vi.fn().mockResolvedValue({ data: mockSearchResults, error: null })
      }))
    });

    const { result } = renderHook(
      () => useBlogPosts({ searchTerm: 'search', currentPage: 1, postsPerPage: 10 }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.blogPosts).toEqual(mockSearchResults);
  });
});