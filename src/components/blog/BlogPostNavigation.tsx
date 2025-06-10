
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useSimpleNavigation } from '@/hooks/useSimpleNavigation';

const BlogPostNavigation = () => {
  const { navigateToPage } = useSimpleNavigation();

  const handleBackClick = () => {
    navigateToPage('/blog');
  };

  return (
    <div className="border-t pt-8 mb-12">
      <Button variant="outline" className="flex items-center" onClick={handleBackClick}>
        <ArrowLeft className="mr-2" />
        Back to Blog
      </Button>
    </div>
  );
};

export default BlogPostNavigation;
