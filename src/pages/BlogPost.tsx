
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { BlogPostData } from '@/integrations/supabase/client';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogPost() {
      if (!slug) {
        setError("No blog post slug provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log(`Fetching blog post with slug: "${slug}"`);
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        
        console.log("Blog post fetch response:", 
          error ? `Error: ${error.message}` : 
          data ? `Success: ${data.title}` : "No data found");
        
        if (error) {
          console.error('Error fetching blog post:', error);
          setError(error.message);
          toast({
            title: "Error loading blog post",
            description: error.message,
            variant: "destructive"
          });
          return;
        }
        
        if (!data) {
          console.log("No blog post found with slug:", slug);
          setError("Blog post not found");
          setPost(null);
          return;
        }
        
        console.log("Blog post loaded successfully:", data.title);
        setPost(data as BlogPostData);
        document.title = `${data.title} | Y Realty Team`;
        window.scrollTo(0, 0);
      } catch (error: any) {
        console.error('Error in blog post fetch:', error);
        setError("An unexpected error occurred");
        toast({
          title: "Error loading blog post",
          description: "Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPost();
  }, [slug]);

  if (loading) {
    return (
      <PageLayout title="Loading...">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="w-full h-[500px] rounded-lg mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error || !post) {
    return (
      <PageLayout title="Blog Post Not Found">
        <div className="text-center py-12">
          <p className="text-xl font-medium text-gray-700">{error || "The blog post you are looking for does not exist."}</p>
          <p className="text-gray-500 mt-2">Please check the URL or go back to the blog page.</p>
          <Link to="/blog">
            <Button className="mt-6">
              <ArrowLeft className="mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  // Parse blog content - replace escaped newlines with actual newlines
  const formattedContent = post.content.replace(/\\n/g, '\n');

  return (
    <PageLayout 
      title={post.title}
      subtitle={post.excerpt}
    >
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="w-full h-[500px] object-cover rounded-lg mb-6"
            onError={(e) => {
              console.log("Blog post image load error, using fallback");
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60';
            }}
          />
          <div className="flex items-center justify-between text-gray-600 mb-4">
            <div>Published on: {post.date}</div>
            <div>By {post.author}</div>
          </div>
        </div>
        
        <div className="prose prose-lg max-w-none mb-8">
          {formattedContent.split('\n').map((paragraph, index) => (
            paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
          ))}
        </div>

        <div className="mt-8 border-t pt-6">
          <Link to="/blog">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </article>
    </PageLayout>
  );
};

export default BlogPost;
