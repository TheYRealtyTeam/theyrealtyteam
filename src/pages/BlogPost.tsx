
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { supabase, BlogPostData } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import BlogPostLoading from '@/components/blog/BlogPostLoading';
import BlogPostError from '@/components/blog/BlogPostError';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogPostContent from '@/components/blog/BlogPostContent';
import BlogPostNavigation from '@/components/blog/BlogPostNavigation';
import RelatedPosts from '@/components/blog/RelatedPosts';
import BlogSEO from '@/components/blog/BlogSEO';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostData[]>([]);
  const [previousPost, setPreviousPost] = useState<BlogPostData | undefined>();
  const [nextPost, setNextPost] = useState<BlogPostData | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchBlogPost() {
      try {
        setLoading(true);
        setError(null);

        // Find the post by slug
        const { data: postData, error: postError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (postError) {
          setError(postError.message);
          toast({
            title: "Error fetching blog post",
            description: postError.message,
            variant: "destructive"
          });
          return;
        }

        if (!postData) {
          setPost(null);
          return;
        }

        setPost(postData as BlogPostData);

        // Fetch all posts to determine previous/next navigation
        const { data: allPosts } = await supabase
          .from('blog_posts')
          .select('id, slug, title, date')
          .order('date', { ascending: false });

        if (allPosts) {
          const currentIndex = allPosts.findIndex(p => p.id === postData.id);
          if (currentIndex > 0) {
            setNextPost(allPosts[currentIndex - 1] as BlogPostData);
          }
          if (currentIndex < allPosts.length - 1) {
            setPreviousPost(allPosts[currentIndex + 1] as BlogPostData);
          }
        }

        // Find related posts (same category, excluding current post)
        const { data: relatedData, error: relatedError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('category', postData.category)
          .neq('id', postData.id)
          .limit(3);

        if (relatedError) {
          // Failed to fetch related posts - continue without them
        } else {
          setRelatedPosts(relatedData as BlogPostData[] || []);
        }

        document.title = `${postData.title} | Y Realty Team Blog`;
        window.scrollTo(0, 0);
      } catch (error: any) {
        setError("An unexpected error occurred: " + (error.message || "Unknown error"));
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPost();
  }, [slug]);

  if (loading) {
    return <BlogPostLoading />;
  }

  if (error || !post) {
    return <BlogPostError error={error} />;
  }

  const canonicalUrl = `https://yrealtyteam.com/blog/${post.slug}`;

  return (
    <>
      <BlogSEO post={post} canonicalUrl={canonicalUrl} />
      <PageLayout 
        title={post.title}
        subtitle={post.excerpt}
      >
        <article className="max-w-4xl mx-auto">
          <BlogPostHeader post={post} />
          <BlogPostContent content={post.content} />
          <BlogPostNavigation previousPost={previousPost} nextPost={nextPost} />
          <RelatedPosts relatedPosts={relatedPosts} />
        </article>
      </PageLayout>
    </>
  );
};

export default BlogPost;
