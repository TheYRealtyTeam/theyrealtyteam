import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { blogPosts } from '@/components/BlogPostsList'; // Import blog posts directly from the source

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    // Find the blog post that matches the current slug
    const currentPost = blogPosts.find(p => p.slug === slug);
    
    if (currentPost) {
      setPost(currentPost);
      document.title = `${currentPost.title} | Y Realty Team`;
      window.scrollTo(0, 0);
    }
  }, [slug]);

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
            src={post.image} 
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
          {/* Placeholder for full blog post content - would typically come from a CMS or backend */}
          <p>{post.excerpt}</p>
          <p>Stay tuned for the full article...</p>
        </div>
      </article>
    </PageLayout>
  );
};

export default BlogPost;
