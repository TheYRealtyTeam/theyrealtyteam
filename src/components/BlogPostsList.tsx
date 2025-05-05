
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Tag, Search, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { BlogPostData } from '@/integrations/supabase/client';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BlogPostsListProps {
  searchTerm: string;
}

const BlogPostsList: React.FC<BlogPostsListProps> = ({ searchTerm }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Starting to fetch blog posts...");
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });
        
        console.log("Blog posts fetch complete:", { 
          success: !error, 
          count: data?.length || 0,
          error: error?.message
        });
        
        if (error) {
          console.error('Error fetching blog posts:', error);
          setError(error.message);
          toast({
            title: "Error fetching blog posts",
            description: error.message,
            variant: "destructive"
          });
          return;
        }
        
        if (!data || data.length === 0) {
          console.log("No blog posts found in the database");
          setError("No blog posts found");
          setBlogPosts([]);
          return;
        }
        
        console.log("Blog posts fetched successfully. First post:", data[0]?.title);
        setBlogPosts(data as BlogPostData[]);
      } catch (error: any) {
        console.error('Unexpected error in blog posts fetch:', error);
        setError("An unexpected error occurred");
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

  useEffect(() => {
    // Show searching state when search term changes
    if (searchTerm.trim() !== '') {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 500); // Short delay for search animation
      return () => clearTimeout(timer);
    }
    setIsSearching(false);
  }, [searchTerm]);

  // Filter posts based on search term
  const filteredPosts = searchTerm.trim() === '' 
    ? blogPosts 
    : blogPosts.filter(post => {
        const lowerSearchTerm = searchTerm.toLowerCase().trim();
        return (
          post.title.toLowerCase().includes(lowerSearchTerm) || 
          post.excerpt.toLowerCase().includes(lowerSearchTerm) ||
          post.content.toLowerCase().includes(lowerSearchTerm) ||
          post.category.toLowerCase().includes(lowerSearchTerm) ||
          post.author.toLowerCase().includes(lowerSearchTerm)
        );
      });

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getCategoryLabel = (categoryId: string) => {
    if (!categoryId) return 'General';
    return categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <Card key={i} className="overflow-hidden h-full flex flex-col">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-6 flex-grow flex flex-col">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-24 w-full mb-4" />
              <div className="flex items-center mb-4">
                <Skeleton className="h-10 w-10 rounded-full mr-3" />
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error && !filteredPosts.length) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-lg">
        <p className="text-xl font-medium text-gray-700">Error loading blog posts</p>
        <p className="text-gray-500 mt-2">{error}</p>
        <p className="text-sm mt-4 text-gray-500">Please check your database connection or try refreshing the page</p>
      </div>
    );
  }

  if (!loading && blogPosts.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-xl font-medium text-gray-700">No blog posts found</p>
        <p className="text-gray-500 mt-2">Please check your database or add some content</p>
      </div>
    );
  }
  
  return (
    <section className="bg-white">
      <div className="container-custom">
        {isSearching ? (
          <div className="text-center py-4 mb-6">
            <Search className="animate-pulse inline-block mr-2 text-yrealty-accent" />
            <span>Searching...</span>
          </div>
        ) : searchTerm.trim() !== '' ? (
          <div className="text-center py-4 mb-6">
            <p className="text-sm text-gray-500">
              Found {filteredPosts.length} results for "<span className="font-medium text-yrealty-navy">{searchTerm}</span>"
            </p>
          </div>
        ) : null}
        
        {filteredPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col bg-white border border-gray-100">
                    <div className="h-56 w-full overflow-hidden relative">
                      <img 
                        src={post.image_url} 
                        alt={post.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          console.log("Image load error, using fallback");
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center space-x-3 mb-3">
                        <Badge variant="outline" className="bg-gray-100 text-yrealty-navy font-medium">
                          <Tag className="w-3.5 h-3.5 mr-1" />
                          {getCategoryLabel(post.category)}
                        </Badge>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1" />
                          {formatDate(post.date)}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-yrealty-navy group-hover:text-yrealty-accent transition-colors duration-200">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-5 flex-grow line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-start space-x-4 pt-4 border-t border-gray-100">
                        <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center text-gray-700 font-bold shrink-0">
                          {post.author ? post.author.split(' ').map(n => n[0]).join('') : 'AA'}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate">{post.author}</div>
                          <div className="text-xs text-gray-500">{post.author_role || 'Author'}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-yrealty-accent font-medium mt-5 group-hover:translate-x-1 transition-transform duration-200">
                        <span>Read article</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} 
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, index) => {
                      const pageNumber = index + 1;
                      // Show first page, last page, current page, and one page before/after current
                      if (
                        pageNumber === 1 || 
                        pageNumber === totalPages ||
                        pageNumber === currentPage ||
                        pageNumber === currentPage - 1 ||
                        pageNumber === currentPage + 1
                      ) {
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink 
                              isActive={pageNumber === currentPage}
                              onClick={() => paginate(pageNumber)}
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else if (
                        (pageNumber === currentPage - 2 && currentPage > 2) || 
                        (pageNumber === currentPage + 2 && currentPage < totalPages - 1)
                      ) {
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} 
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700">No posts found matching your search</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search terms or browse all articles</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPostsList;
