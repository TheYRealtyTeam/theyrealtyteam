
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Plus } from 'lucide-react';
import { useSimpleNavigation } from '@/hooks/useSimpleNavigation';

interface AdminControlsProps {
  isAdmin: boolean;
  postSlug?: string;
}

const AdminControls = ({ isAdmin, postSlug }: AdminControlsProps) => {
  const { navigateToPage } = useSimpleNavigation();

  if (!isAdmin) return null;

  const handleCreatePost = () => {
    navigateToPage('/blog-admin?action=create');
  };

  const handleEditPost = () => {
    if (postSlug) {
      navigateToPage(`/blog-admin?action=edit&slug=${postSlug}`);
    }
  };

  const handleAdminPanel = () => {
    navigateToPage('/blog-admin');
  };

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-amber-800">Admin Controls</h3>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleCreatePost}
            className="border-amber-300 text-amber-700 hover:bg-amber-100"
          >
            <Plus className="h-4 w-4 mr-1" />
            New Post
          </Button>
          {postSlug && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleEditPost}
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit Post
            </Button>
          )}
          <Button 
            size="sm" 
            onClick={handleAdminPanel}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Admin Panel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminControls;
