
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, User, Tag, Calendar } from 'lucide-react';
import { supabase, BlogPostData } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Skeleton } from "@/components/ui/skeleton";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchBlogPost() {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching blog post with slug:", slug);

        // Find the post by slug
        const { data: postData, error: postError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (postError) {
          console.error('Error fetching blog post:', postError);
          setError(postError.message);
          toast({
            title: "Error fetching blog post",
            description: postError.message,
            variant: "destructive"
          });
          return;
        }

        if (!postData) {
          console.log("No blog post found with slug:", slug);
          setPost(null);
          return;
        }

        console.log("Blog post found:", postData.title);
        setPost(postData as BlogPostData);

        // Find related posts (same category, excluding current post)
        const { data: relatedData, error: relatedError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('category', postData.category)
          .neq('id', postData.id)
          .limit(3);

        if (relatedError) {
          console.error('Error fetching related posts:', relatedError);
        } else {
          setRelatedPosts(relatedData as BlogPostData[] || []);
        }

        document.title = `${postData.title} | Y Realty Team Blog`;
        window.scrollTo(0, 0);
      } catch (error: any) {
        console.error('Unexpected error fetching blog post:', error);
        setError("An unexpected error occurred: " + (error.message || "Unknown error"));
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPost();
  }, [slug]);

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

  // Calculate estimated read time based on content length
  const getEstimatedReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  if (loading) {
    return (
      <PageLayout title="Loading...">
        <article className="max-w-4xl mx-auto">
          <Skeleton className="w-full h-[400px] md:h-[500px] rounded-xl mb-8" />
          <div className="space-y-4 mb-8">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-3">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </article>
      </PageLayout>
    );
  }

  if (error || !post) {
    return (
      <PageLayout title="Blog Post Not Found">
        <div className="text-center py-12">
          <p className="text-xl font-medium text-gray-700">
            {error ? "Error loading blog post" : "The blog post you are looking for does not exist."}
          </p>
          <p className="text-gray-500 mt-2">
            {error || "Please check the URL or go back to the blog page."}
          </p>
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

  return (
    <PageLayout 
      title={post.title}
      subtitle={post.excerpt}
    >
      <article className="max-w-4xl mx-auto">
        {/* Article Header */}
        <div className="mb-8">
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="w-full h-[400px] md:h-[500px] object-cover rounded-xl mb-8"
            onError={(e) => {
              console.log("Image load error, using fallback");
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60';
            }}
          />
          
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{getEstimatedReadTime(post.content)} min read</span>
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="bg-yrealty-navy text-white px-4 py-2 rounded-full font-medium">
              {getCategoryLabel(post.category)}
            </span>
          </div>
        </div>
        
        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {post.content.split('\n\n').map((paragraph, index) => {
            // Handle headers
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              const headerText = paragraph.slice(2, -2);
              return <h2 key={index} className="text-2xl font-bold text-yrealty-navy mt-8 mb-4">{headerText}</h2>;
            }
            
            // Handle bullet points
            if (paragraph.includes('•')) {
              const items = paragraph.split('\n').filter(line => line.trim().startsWith('•'));
              return (
                <ul key={index} className="list-disc pl-6 space-y-2 mb-6">
                  {items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-700">{item.replace('•', '').trim()}</li>
                  ))}
                </ul>
              );
            }
            
            // Regular paragraphs
            return paragraph.trim() ? (
              <p key={index} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
            ) : null;
          })}
        </div>

        {/* Navigation */}
        <div className="border-t pt-8 mb-12">
          <Link to="/blog">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="border-t pt-12">
            <h3 className="text-2xl font-bold mb-8 text-yrealty-navy">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`} className="group">
                  <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={relatedPost.image_url} 
                      alt={relatedPost.title} 
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60';
                      }}
                    />
                    <div className="p-4">
                      <span className="text-xs bg-yrealty-blue text-yrealty-navy px-2 py-1 rounded-full">
                        {getCategoryLabel(relatedPost.category)}
                      </span>
                      <h4 className="font-bold mt-2 mb-2 text-yrealty-navy group-hover:text-yrealty-accent transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{relatedPost.excerpt}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </PageLayout>
  );
};

export default BlogPost;
