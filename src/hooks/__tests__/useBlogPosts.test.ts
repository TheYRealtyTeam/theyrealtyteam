/**
 * @jest-environment jsdom
 */
import { renderHook, waitFor } from '@testing-library/react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import * as blogPosts from '@/data/blogPosts';

// Mock the blog posts data
jest.mock('@/data/blogPosts', () => ({
  getAllBlogPosts: jest.fn()
}));

const mockGetAllBlogPosts = blogPosts.getAllBlogPosts as jest.MockedFunction<typeof blogPosts.getAllBlogPosts>;

describe('useBlogPosts Hook', () => {
  const mockPosts = [
    {
      id: '1',
      title: 'Test Post 1',
      excerpt: 'Test excerpt 1',
      content: 'Test content 1',
      author: 'Test Author',
      date: '2023-01-01',
      category: 'Technology',
      slug: 'test-post-1',
      image: '/test-image-1.jpg',
      tags: ['react', 'testing']
    },
    {
      id: '2', 
      title: 'Test Post 2',
      excerpt: 'Test excerpt 2',
      content: 'Test content 2',
      author: 'Test Author',
      date: '2023-01-02',
      category: 'Investment',
      slug: 'test-post-2',
      image: '/test-image-2.jpg',
      tags: ['investment', 'real-estate']
    },
    {
      id: '3',
      title: 'React Testing Guide',
      excerpt: 'Guide to testing React components',
      content: 'Testing content',
      author: 'Test Author',
      date: '2023-01-03',
      category: 'Technology',
      slug: 'react-testing-guide',
      image: '/test-image-3.jpg',
      tags: ['react', 'testing', 'guide']
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetAllBlogPosts.mockReturnValue(mockPosts);
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useBlogPosts({
      searchTerm: '',
      currentPage: 1,
      postsPerPage: 10
    }));

    expect(result.current.loading).toBe(true);
    expect(result.current.blogPosts).toEqual([]);
    expect(result.current.totalPosts).toBe(0);
    expect(result.current.totalPages).toBe(0);
  });

  it('should load all posts when no search term', async () => {
    const { result } = renderHook(() => useBlogPosts({
      searchTerm: '',
      currentPage: 1,
      postsPerPage: 10
    }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.blogPosts).toEqual(mockPosts);
    expect(result.current.totalPosts).toBe(3);
    expect(result.current.totalPages).toBe(1);
  });

  it('should filter posts by search term', async () => {
    const { result } = renderHook(() => useBlogPosts({
      searchTerm: 'React',
      currentPage: 1,
      postsPerPage: 10
    }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.blogPosts).toHaveLength(1);
    expect(result.current.blogPosts[0].title).toBe('React Testing Guide');
    expect(result.current.totalPosts).toBe(1);
  });

  it('should filter posts case-insensitively', async () => {
    const { result } = renderHook(() => useBlogPosts({
      searchTerm: 'react',
      currentPage: 1,
      postsPerPage: 10
    }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.blogPosts).toHaveLength(1);
    expect(result.current.blogPosts[0].title).toBe('React Testing Guide');
  });

  it('should handle pagination correctly', async () => {
    const { result } = renderHook(() => useBlogPosts({
      searchTerm: '',
      currentPage: 1,
      postsPerPage: 2
    }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.blogPosts).toHaveLength(2);
    expect(result.current.totalPosts).toBe(3);
    expect(result.current.totalPages).toBe(2);
  });

  it('should handle second page of pagination', async () => {
    const { result } = renderHook(() => useBlogPosts({
      searchTerm: '',
      currentPage: 2,
      postsPerPage: 2
    }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.blogPosts).toHaveLength(1);
    expect(result.current.blogPosts[0].id).toBe('3');
  });

  it('should return empty array for search with no results', async () => {
    const { result } = renderHook(() => useBlogPosts({
      searchTerm: 'nonexistent',
      currentPage: 1,
      postsPerPage: 10
    }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.blogPosts).toEqual([]);
    expect(result.current.totalPosts).toBe(0);
    expect(result.current.totalPages).toBe(0);
  });

  it('should search in multiple fields', async () => {
    const { result } = renderHook(() => useBlogPosts({
      searchTerm: 'investment',
      currentPage: 1,
      postsPerPage: 10
    }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.blogPosts).toHaveLength(1);
    expect(result.current.blogPosts[0].id).toBe('2');
  });

  it('should update when search parameters change', async () => {
    const { result, rerender } = renderHook(
      ({ searchTerm, currentPage, postsPerPage }) => useBlogPosts({
        searchTerm,
        currentPage,
        postsPerPage
      }),
      {
        initialProps: {
          searchTerm: '',
          currentPage: 1,
          postsPerPage: 10
        }
      }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.blogPosts).toHaveLength(3);

    // Update search term
    rerender({
      searchTerm: 'Test Post 1',
      currentPage: 1,
      postsPerPage: 10
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.blogPosts).toHaveLength(1);
    expect(result.current.blogPosts[0].id).toBe('1');
  });
});