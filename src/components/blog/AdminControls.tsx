
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { addRandomBlogPosts } from '@/utils/blogUtils';
import { PlusIcon, Loader2 } from 'lucide-react';

interface AdminControlsProps {
  onBlogPostsAdded: () => void;
}

const AdminControls: React.FC<AdminControlsProps> = ({ onBlogPostsAdded }) => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(5);

  const handleAddPosts = async () => {
    setLoading(true);
    try {
      const success = await addRandomBlogPosts(count);
      if (success) {
        onBlogPostsAdded();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8 shadow-sm">
      <h3 className="text-lg font-medium mb-3 text-yrealty-navy">Admin Controls</h3>
      <div className="flex items-end gap-4">
        <div>
          <label htmlFor="post-count" className="block text-sm font-medium text-gray-700 mb-1">
            Number of posts to add:
          </label>
          <select 
            id="post-count"
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            {[1, 5, 10, 20].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <Button 
          onClick={handleAddPosts} 
          className="bg-yrealty-navy hover:bg-yrealty-navy/80"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Blog Posts
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        This will add randomly generated blog posts to the database.
      </p>
    </div>
  );
};

export default AdminControls;
