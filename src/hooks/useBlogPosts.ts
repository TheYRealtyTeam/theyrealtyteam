
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { BlogPostData } from '@/integrations/supabase/client';

interface UseBlogPostsProps {
  searchTerm: string;
  currentPage: number;
  postsPerPage: number;
  category?: string;
}

export const useBlogPosts = ({ searchTerm, currentPage, postsPerPage, category }: UseBlogPostsProps) => {
  const [blogPosts, setBlogPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [cachedPosts, setCachedPosts] = useState<BlogPostData[]>([]);

  const handleRetry = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setLoading(true);
        setError(null);
        
        // First get count of total posts for pagination
        let countQuery = supabase
          .from('blog_posts')
          .select('id', { count: 'exact', head: true });
        
        // Apply category filter to count if provided
        if (category) {
          countQuery = countQuery.eq('category', category);
        }
        
        const countResponse = await countQuery;
          
        if (countResponse.error) {
          throw new Error('Unable to load blog posts. Please try again later.');
        }
        
        setTotalPosts(countResponse.count || 0);
        
        // Then fetch the current page of posts
        let query = supabase
          .from('blog_posts')
          .select('*');
        
        // Apply category filter if provided
        if (category) {
          query = query.eq('category', category);
        }
        
        const { data, error } = await query
          .order('created_at', { ascending: false })
          .range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1);
        
        if (error) {
          setError('Unable to load blog posts. Please try again later.');
          toast({
            title: "Connection issue",
            description: "Having trouble loading blog posts. Please check your connection and try again.",
            variant: "destructive"
          });
          return;
        }
        
        if (!data || data.length === 0) {
          setError("No blog posts found");
          setBlogPosts([]);
          return;
        }
        
        setBlogPosts(data as BlogPostData[]);
      } catch (error: unknown) {
        setError("Unable to load blog posts. Please try again later.");
        toast({
          title: "Connection issue",
          description: "Please check your connection and try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }

    async function searchBlogPosts() {
      if (searchTerm.trim() === '') {
        return;
      }
      
      try {
        setLoading(true);
        setIsSearching(true);
        setError(null);
        
        const lowerSearchTerm = searchTerm.toLowerCase().trim();
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .or(
            `title.ilike.%${lowerSearchTerm}%,excerpt.ilike.%${lowerSearchTerm}%,content.ilike.%${lowerSearchTerm}%,category.ilike.%${lowerSearchTerm}%,author.ilike.%${lowerSearchTerm}%`
          )
          .order('created_at', { ascending: false });
        
        if (error) {
          setError('Unable to search blog posts. Please try again later.');
          return;
        }
        
        setTotalPosts(data?.length || 0);
        setBlogPosts(data as BlogPostData[] || []);
      } catch (error: unknown) {
        setError("Unable to search blog posts. Please try again later.");
      } finally {
        setLoading(false);
        setTimeout(() => setIsSearching(false), 500);
      }
    }

    // Use cached posts when available to reduce database queries
    if (searchTerm.trim() !== '' || !cachedPosts.length) {
      if (searchTerm.trim() !== '') {
        searchBlogPosts();
      } else {
        const fetchWithRetry = async (retries = 3, delay = 1000) => {
          for (let i = 0; i < retries; i++) {
            try {
              await fetchBlogPosts();
              break;
            } catch (error) {
              // Retry failed, continue to next attempt
              if (i < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
              }
            }
          }
        };

        fetchWithRetry();
      }
    }
  }, [currentPage, postsPerPage, searchTerm, category, refreshTrigger, cachedPosts.length]);

  return {
    blogPosts,
    loading,
    error,
    isSearching,
    totalPosts,
    handleRetry
  };
};
