import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { supabase, BlogPostData } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface BlogPostsListProps {
  searchTerm: string;
}

const BlogPostsList: React.FC<BlogPostsListProps> = ({ searchTerm }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('date', { ascending: false });
        
        if (error) throw error;
        
        setBlogPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        toast({
          title: "Error fetching blog posts",
          description: "Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getCategoryLabel = (categoryId: string) => {
    return categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-2 text-gray-600">Loading blog posts...</p>
      </div>
    );
  }

  return (
    <section className="bg-white">
      <div className="container-custom">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="reveal overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                <div className="h-48 w-full overflow-hidden relative">
                  <img 
                    src={post.image_url} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60';
                    }}
                  />
                  <div className="absolute top-0 right-0 bg-yrealty-accent text-white text-xs px-2 py-1">
                    {getCategoryLabel(post.category)}
                  </div>
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <Badge variant="outline" className="w-fit mb-2 text-sm bg-gray-100">
                    {getCategoryLabel(post.category)}
                  </Badge>
                  <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                  <h3 className="text-xl font-bold mb-2 text-yrealty-navy">{post.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center text-gray-700 font-bold mr-3">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{post.author}</div>
                      <div className="text-xs text-gray-500">{post.author_role}</div>
                    </div>
                  </div>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-yrealty-accent font-medium hover:underline"
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Read More
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No posts found matching your search</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPostsList;
