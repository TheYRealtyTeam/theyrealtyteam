/**
 * @vitest-environment jsdom
 */
import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useBlogPosts } from '@/hooks/useBlogPosts';

// Mock Supabase client used by the hook
vi.mock('@/integrations/supabase/client', () => {
  const fromMock = vi.fn((table: string) => {
    const chain: any = {
      select: vi.fn((...args: any[]) => {
        // Head count query
        if (args[1]?.head) {
          return Promise.resolve({ data: null, error: null, count: 3 });
        }
        return chain;
      }),
      order: vi.fn(() => chain),
      range: vi.fn(() => Promise.resolve({
        data: [
          { id: '1', title: 'A', excerpt: '', content: '', date: '', author: '', author_role: '', category: '', image_url: '', slug: 'a' },
          { id: '2', title: 'B', excerpt: '', content: '', date: '', author: '', author_role: '', category: '', image_url: '', slug: 'b' },
          { id: '3', title: 'C', excerpt: '', content: '', date: '', author: '', author_role: '', category: '', image_url: '', slug: 'c' },
        ],
        error: null,
      })),
    };
    return chain;
  });
  return {
    supabase: {
      from: fromMock,
    },
  };
});

describe('useBlogPosts hook', () => {
  it('initializes and fetches posts', async () => {
    const { result } = renderHook(() =>
      useBlogPosts({ searchTerm: '', currentPage: 1, postsPerPage: 10 })
    );

    // initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.blogPosts).toEqual([]);

    // after load
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.blogPosts.length).toBe(3);
    expect(result.current.totalPosts).toBe(3);
  });

  it('handles search path without crashing', async () => {
    const { result } = renderHook(() =>
      useBlogPosts({ searchTerm: 'react', currentPage: 1, postsPerPage: 10 })
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    // In mocked path we reuse the same chain, so just assert no crash and state is set
    expect(Array.isArray(result.current.blogPosts)).toBe(true);
  });
});
