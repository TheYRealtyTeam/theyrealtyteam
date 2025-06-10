
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useSimpleNavigation } from '@/hooks/useSimpleNavigation';

interface BlogPostCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    author_role: string;
    category: string;
    image_url: string;
    slug: string;
  };
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const { navigateToPage } = useSimpleNavigation();

  const handlePostClick = () => {
    navigateToPage(`/blog/${post.slug}`);
  };

  const getCategoryLabel = (categoryId: string) => {
    if (!categoryId) return 'General';
    return categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <Card 
      className="overflow-hidden h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handlePostClick}
    >
      <img 
        src={post.image_url} 
        alt={post.title} 
        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60';
        }}
      />
      <CardContent className="p-6 flex-grow flex flex-col">
        <span className="text-xs bg-yrealty-blue text-yrealty-navy px-2 py-1 rounded-full mb-2 w-fit">
          {getCategoryLabel(post.category)}
        </span>
        <h3 className="font-bold text-lg mb-2 text-yrealty-navy hover:text-yrealty-accent transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{post.excerpt}</p>
        
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-yrealty-blue rounded-full flex items-center justify-center mr-3">
            <span className="text-yrealty-navy font-bold text-sm">
              {post.author.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-medium text-sm text-gray-900">{post.author}</p>
            <p className="text-xs text-gray-500">{post.author_role}</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-500">
          {new Date(post.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;
