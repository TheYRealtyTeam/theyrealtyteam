
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { BlogPostData } from '@/integrations/supabase/client';

interface BlogPostsListProps {
  searchTerm: string;
}

const BlogPostsList: React.FC<BlogPostsListProps> = ({ searchTerm }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Starting to fetch blog posts...");
        
        // Perform the fetch from Supabase with simplified query
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*');
        
        console.log("Blog posts fetch complete:", { 
          success: !error, 
          count: data?.length || 0,
          error: error?.message
        });
        
        if (error) {
          console.error('Error fetching blog posts:', error);
          setError(error.message);
          toast({
            title: "Error fetching blog posts",
            description: error.message,
            variant: "destructive"
          });
          return;
        }
        
        if (!data || data.length === 0) {
          console.log("No blog posts found in the database");
          setError("No blog posts found");
          setBlogPosts([]);
          return;
        }
        
        console.log("Blog posts fetched successfully. First post:", data[0]?.title);
        setBlogPosts(data as BlogPostData[]);
      } catch (error: any) {
        console.error('Unexpected error in blog posts fetch:', error);
        setError("An unexpected error occurred");
        toast({
          title: "Error fetching blog posts",
          description: "Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  // Filter posts based on search term
  const filteredPosts = blogPosts.filter(post => {
    if (!searchTerm) return true;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(lowerSearchTerm) || 
      post.excerpt.toLowerCase().includes(lowerSearchTerm) ||
      post.content.toLowerCase().includes(lowerSearchTerm)
    );
  });

  console.log("Filtered posts count:", filteredPosts.length, "Total posts:", blogPosts.length);

  const getCategoryLabel = (categoryId: string) => {
    if (!categoryId) return 'General';
    return categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <Card key={i} className="overflow-hidden h-full flex flex-col">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-6 flex-grow flex flex-col">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-24 w-full mb-4" />
              <div className="flex items-center mb-4">
                <Skeleton className="h-10 w-10 rounded-full mr-3" />
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16 mt-1" />
                </div>
              </div>
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-lg">
        <p className="text-xl font-medium text-gray-700">Error loading blog posts</p>
        <p className="text-gray-500 mt-2">{error}</p>
        <p className="text-sm mt-4 text-gray-500">Please check your database connection or try refreshing the page</p>
      </div>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-xl font-medium text-gray-700">No blog posts found</p>
        <p className="text-gray-500 mt-2">Please check your database or add some content</p>
      </div>
    );
  }
  
  return (
    <section className="bg-white">
      <div className="container-custom">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="reveal overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                <div className="h-48 w-full overflow-hidden relative">
                  <img 
                    src={post.image_url} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.log("Image load error, using fallback");
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60';
                    }}
                  />
                  <div className="absolute top-0 right-0 bg-yrealty-accent text-white text-xs px-2 py-1">
                    {getCategoryLabel(post.category)}
                  </div>
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <Badge variant="outline" className="w-fit mb-2 text-sm bg-gray-100">
                    {getCategoryLabel(post.category)}
                  </Badge>
                  <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                  <h3 className="text-xl font-bold mb-2 text-yrealty-navy">{post.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center text-gray-700 font-bold mr-3">
                      {post.author ? post.author.split(' ').map(n => n[0]).join('') : 'AA'}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{post.author}</div>
                      <div className="text-xs text-gray-500">{post.author_role}</div>
                    </div>
                  </div>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-yrealty-accent font-medium hover:underline"
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Read More
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No posts found matching your search</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPostsList;
