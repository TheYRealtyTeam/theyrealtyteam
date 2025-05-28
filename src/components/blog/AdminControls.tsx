
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { addRandomBlogPosts } from '@/utils/blogUtils';
import { PlusIcon, Loader2, CheckCircle } from 'lucide-react';

interface AdminControlsProps {
  onBlogPostsAdded: () => void;
}

const AdminControls: React.FC<AdminControlsProps> = ({ onBlogPostsAdded }) => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(20);
  const [justAdded, setJustAdded] = useState(false);

  // Automatically add 20 posts when component mounts (one time only)
  useEffect(() => {
    const hasAutoAdded = localStorage.getItem('blog-auto-added');
    if (!hasAutoAdded) {
      handleAddPosts(20); // Force 20 posts
      localStorage.setItem('blog-auto-added', 'true');
    }
  }, []);

  const handleAddPosts = async (customCount?: number) => {
    setLoading(true);
    setJustAdded(false);
    const postsToAdd = customCount || count;
    try {
      const success = await addRandomBlogPosts(postsToAdd);
      if (success) {
        onBlogPostsAdded();
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 3000);
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
            {[5, 10, 15, 20, 25, 30].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <Button 
          onClick={() => handleAddPosts()} 
          className="bg-yrealty-navy hover:bg-yrealty-navy/80"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : justAdded ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              Added!
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
      {justAdded && (
        <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
          Successfully added {count} new blog posts!
        </div>
      )}
    </div>
  );
};

export default AdminControls;
