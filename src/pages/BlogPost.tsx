
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  author_role: string;
  category: string;
  image_url: string;
  slug: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogPost() {
      if (!slug) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (error) {
          console.error('Error fetching blog post:', error);
          toast({
            title: "Error loading blog post",
            description: "Please try again later.",
            variant: "destructive"
          });
          return;
        }
        
        if (data) {
          setPost(data);
          document.title = `${data.title} | Y Realty Team`;
          window.scrollTo(0, 0);
        }
      } catch (error) {
        console.error('Error in blog post fetch:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPost();
  }, [slug]);

  if (loading) {
    return (
      <PageLayout title="Loading...">
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-gray-600">Loading blog post...</p>
        </div>
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout title="Blog Post Not Found">
        <div className="text-center py-12">
          <p>The blog post you are looking for does not exist.</p>
        </div>
      </PageLayout>
    );
  }

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
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60';
            }}
          />
          <div className="flex items-center justify-between text-gray-600 mb-4">
            <div>Published on: {post.date}</div>
            <div>By {post.author}</div>
          </div>
        </div>
        
        <div className="prose prose-lg max-w-none">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </PageLayout>
  );
};

export default BlogPost;
