import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import BlogPostsList from '@/components/BlogPostsList';
import { Search, FileText, Rss, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import { Command, CommandInput } from "@/components/ui/command";
import AdminControls from '@/components/blog/AdminControls';

interface FeaturedArticle {
  title: string;
  excerpt: string;
  image_url: string;
  slug: string;
  date: string;
  category: string;
}

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredArticle, setFeaturedArticle] = useState<FeaturedArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    document.title = "Blog | Y Realty Team";
    window.scrollTo(0, 0);
    
    async function fetchFeaturedArticle() {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Attempting to fetch featured article...");
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select('title, excerpt, image_url, slug, date, category')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        console.log("Featured article response status:", error ? "error" : "success");
        
        if (error) {
          console.error('Error fetching featured article:', error);
          setError(error.message);
          toast({
            title: "Error loading featured article",
            description: error.message,
            variant: "destructive"
          });
          return;
        }
        
        if (!data) {
          console.log("No featured article found");
          setError("No featured article found");
          setFeaturedArticle(null);
          return;
        }
        
        console.log("Featured article found:", data.title);
        setFeaturedArticle(data as FeaturedArticle);
      } catch (error: any) {
        console.error('Error in featured article fetch:', error);
        setError("An unexpected error occurred");
        toast({
          title: "Error loading featured article",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedArticle();
  }, [refreshTrigger]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log("Search term updated:", e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search submitted with term:", searchTerm);
    // The search is already reactive, so we don't need to do anything else here
  };

  const handleBlogPostsAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const getCategoryLabel = (categoryId: string) => {
    if (!categoryId) return 'General';
    return categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <PageLayout 
      title="Property Management Insights"
      subtitle="Stay ahead of the curve with our latest property management trends, strategies, and market forecasts"
    >
      <div className="space-y-12">
        {/* Admin Controls */}
        <AdminControls onBlogPostsAdded={handleBlogPostsAdded} />

        {/* Featured Article */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 mb-12 transform transition-all duration-500 hover:shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-64 sm:h-96 lg:h-auto relative overflow-hidden">
              {loading ? (
                <Skeleton className="w-full h-full" />
              ) : featuredArticle ? (
                <>
                  <img 
                    src={featuredArticle.image_url} 
                    alt={featuredArticle.title} 
                    className="w-full h-full object-cover hover:scale-105 transform transition-transform duration-700"
                    onError={(e) => {
                      console.log("Featured image load error, using fallback");
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No featured image available</p>
                </div>
              )}
              {!loading && featuredArticle && (
                <div className="absolute top-4 left-4 bg-yrealty-accent text-white font-bold px-3 py-1 rounded-md">
                  FEATURED
                </div>
              )}
            </div>
            <div className="p-6 lg:p-8 flex flex-col justify-center relative">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-8 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              ) : error ? (
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-700">Error loading featured article</p>
                  <p className="text-gray-500 mt-2">{error}</p>
                </div>
              ) : featuredArticle ? (
                <>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-yrealty-blue/40 text-yrealty-navy px-3 py-1 rounded-md text-sm font-medium">
                      {getCategoryLabel(featuredArticle.category)}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" /> 
                      {formatDate(featuredArticle.date)}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-yrealty-navy">
                    {featuredArticle.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3 lg:line-clamp-4">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <Link to={`/blog/${featuredArticle.slug}`} className="inline-block">
                    <Button className="bg-yrealty-navy hover:bg-yrealty-navy/90">
                      <FileText className="mr-2 h-4 w-4" />
                      Read Full Article
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-700">No featured article available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearchSubmit}>
            <Command className="rounded-lg border shadow-md">
              <CommandInput 
                placeholder="Search articles by title, content, or author..." 
                value={searchTerm}
                onValueChange={setSearchTerm}
                className="h-12"
              />
            </Command>
          </form>
        </div>

        {/* Blog Posts List */}
        <BlogPostsList searchTerm={searchTerm} key={`blog-posts-list-${refreshTrigger}`} />

        {/* Subscribe Section */}
        
      </div>
    </PageLayout>
  );
};

export default Blog;
