
import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import BlogPostsList from '@/components/BlogPostsList';
import { Search, FileText, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';

interface FeaturedArticle {
  title: string;
  excerpt: string;
  image_url: string;
  slug: string;
  date: string;
}

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredArticle, setFeaturedArticle] = useState<FeaturedArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Blog | Y Realty Team";
    window.scrollTo(0, 0);
    
    async function fetchFeaturedArticle() {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Attempting to fetch featured article...");
        
        // Use maybeSingle() instead of single() to avoid errors if no data is found
        const { data, error } = await supabase
          .from('blog_posts')
          .select('title, excerpt, image_url, slug, date')
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
  }, []);

  return (
    <PageLayout 
      title="2025 Property Management Insights"
      subtitle="Stay ahead of the curve with our latest property management trends, AI-driven strategies, and market forecasts"
    >
      <div className="space-y-8">
        <div className="bg-yrealty-blue/20 rounded-xl overflow-hidden shadow-lg mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-64 lg:h-auto relative">
              {loading ? (
                <Skeleton className="w-full h-full" />
              ) : featuredArticle ? (
                <img 
                  src={featuredArticle.image_url} 
                  alt={featuredArticle.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log("Featured image load error, using fallback");
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No featured image available</p>
                </div>
              )}
              {!loading && featuredArticle && (
                <div className="absolute top-4 left-4 bg-yrealty-navy text-white text-xs font-bold px-3 py-1 rounded-full">
                  FEATURED
                </div>
              )}
            </div>
            <div className="p-6 lg:p-8 flex flex-col justify-center">
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
                  <div className="text-sm text-gray-500 mb-2">{featuredArticle.date} | Market Analysis</div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-yrealty-navy">{featuredArticle.title}</h2>
                  <p className="text-gray-600 mb-6">{featuredArticle.excerpt}</p>
                  <Link to={`/blog/${featuredArticle.slug}`}>
                    <Button className="bg-yrealty-navy hover:bg-yrealty-navy/90 w-full sm:w-auto">
                      <FileText className="mr-2" />
                      Read Full Analysis
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

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                console.log("Search term updated:", e.target.value);
              }}
              className="w-full px-4 py-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yrealty-accent focus:border-transparent"
            />
            <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
          </div>
        </div>

        <BlogPostsList searchTerm={searchTerm} />

        <div className="text-center mt-12 mb-8">
          <div className="inline-flex items-center text-yrealty-navy hover:underline">
            <Rss className="w-5 h-5 mr-2" />
            <span>Subscribe to our blog updates</span>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/resources">
            <Button variant="outline" className="border-yrealty-navy text-yrealty-navy hover:bg-yrealty-blue">
              View Our Free Property Management Resources
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default Blog;
