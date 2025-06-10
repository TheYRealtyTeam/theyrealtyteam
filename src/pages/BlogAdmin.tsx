
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import AdminControls from '@/components/blog/AdminControls';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useSimpleNavigation } from '@/hooks/useSimpleNavigation';

const BlogAdmin = () => {
  const { navigateToPage } = useSimpleNavigation();

  const handleBackToBlog = () => {
    navigateToPage('/blog');
  };

  return (
    <PageLayout 
      title="Blog Administration" 
      subtitle="Manage blog posts and content"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" className="flex items-center" onClick={handleBackToBlog}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>

        <AdminControls isAdmin={true} />
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-3">Quick Actions</h3>
          <p className="text-gray-600 mb-4">
            Use the controls above to add new blog posts to the database. The posts will be automatically generated with relevant property management content.
          </p>
          <div className="text-sm text-gray-500">
            <p>• Posts are generated with realistic titles and content</p>
            <p>• Categories include property management, investment advice, and market trends</p>
            <p>• Each post includes author information and relevant tags</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogAdmin;
