
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BlogPostData } from '@/integrations/supabase/client';

interface BlogPostNavigationProps {
  previousPost?: BlogPostData;
  nextPost?: BlogPostData;
}

const BlogPostNavigation = ({ previousPost, nextPost }: BlogPostNavigationProps) => {
  return (
    <div className="border-t pt-8 mb-12 space-y-6">
      <Link to="/blog">
        <Button variant="outline" className="flex items-center">
          <ArrowLeft className="mr-2" size={16} />
          Back to Blog
        </Button>
      </Link>
      
      {(previousPost || nextPost) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {previousPost && (
            <Link to={`/blog/${previousPost.slug}`} className="group">
              <div className="p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <ArrowLeft size={14} className="mr-1" />
                  Previous Post
                </div>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {previousPost.title}
                </h4>
              </div>
            </Link>
          )}
          
          {nextPost && (
            <Link to={`/blog/${nextPost.slug}`} className="group">
              <div className="p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all">
                <div className="flex items-center justify-end text-sm text-muted-foreground mb-2">
                  Next Post
                  <ArrowRight size={14} className="ml-1" />
                </div>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-right">
                  {nextPost.title}
                </h4>
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogPostNavigation;
