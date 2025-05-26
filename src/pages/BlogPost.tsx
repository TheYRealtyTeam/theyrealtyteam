
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { blogPosts, BlogPost as BlogPostType } from '@/data/blogPosts';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, User, Tag, Calendar } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    if (!slug) return;

    // Find the post by slug
    const foundPost = blogPosts.find(p => p.slug === slug);
    setPost(foundPost || null);

    if (foundPost) {
      // Find related posts (same category, excluding current post)
      const related = blogPosts
        .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
        .slice(0, 3);
      setRelatedPosts(related);

      document.title = `${foundPost.title} | Y Realty Team Blog`;
      window.scrollTo(0, 0);
    }
  }, [slug]);

  if (!post) {
    return (
      <PageLayout title="Blog Post Not Found">
        <div className="text-center py-12">
          <p className="text-xl font-medium text-gray-700">The blog post you are looking for does not exist.</p>
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
          />
          
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Category and Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="bg-yrealty-navy text-white px-4 py-2 rounded-full font-medium">
              {post.category}
            </span>
            {post.tags.map((tag, index) => (
              <span key={index} className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
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
                    />
                    <div className="p-4">
                      <span className="text-xs bg-yrealty-blue text-yrealty-navy px-2 py-1 rounded-full">
                        {relatedPost.category}
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
