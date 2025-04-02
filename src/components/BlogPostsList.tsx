
import React from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorRole: string;
  category: string;
  image: string;
  slug: string;
}

interface BlogPostsListProps {
  searchTerm: string;
  activeCategory: string;
}

const BlogPostsList: React.FC<BlogPostsListProps> = ({ searchTerm, activeCategory }) => {
  // Sample blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: '5 Ways to Maximize Your Rental Property ROI',
      excerpt: 'Learn proven strategies to increase the return on investment for your rental properties with these effective management techniques.',
      date: 'June 15, 2023',
      author: 'Sarah Johnson',
      authorRole: 'Investment Specialist',
      category: 'investment',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      slug: '5-ways-to-maximize-rental-property-roi'
    },
    {
      id: '2',
      title: 'The Complete Guide to Tenant Screening',
      excerpt: 'Effective tenant screening is the foundation of successful property management. Here's how to do it right and avoid costly mistakes.',
      date: 'May 22, 2023',
      author: 'Michael Chen',
      authorRole: 'Property Manager',
      category: 'property-management',
      image: 'https://images.unsplash.com/photo-1560518883-f5be2191702d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      slug: 'complete-guide-to-tenant-screening'
    },
    {
      id: '3',
      title: 'Market Trends: What to Expect in Real Estate for 2023',
      excerpt: 'Our experts analyze current market conditions and make predictions for the real estate market in the coming year.',
      date: 'April 10, 2023',
      author: 'Jennifer Williams',
      authorRole: 'Market Analyst',
      category: 'market-trends',
      image: 'https://images.unsplash.com/photo-1555642915-ef05731a926c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      slug: 'market-trends-real-estate-2023'
    },
    {
      id: '4',
      title: 'Seasonal Maintenance Checklist for Landlords',
      excerpt: 'Stay ahead of property maintenance with this comprehensive seasonal checklist designed specifically for rental property owners.',
      date: 'March 18, 2023',
      author: 'Robert Thompson',
      authorRole: 'Maintenance Director',
      category: 'maintenance',
      image: 'https://images.unsplash.com/photo-1621551711550-c73f9fb4d76d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fG1haW50ZW5hbmNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      slug: 'seasonal-maintenance-checklist-landlords'
    },
    {
      id: '5',
      title: 'Top Tax Deductions for Rental Property Owners',
      excerpt: 'Don't miss out on these often-overlooked tax deductions that can save rental property owners thousands each year.',
      date: 'February 5, 2023',
      author: 'Lisa Garcia',
      authorRole: 'Financial Advisor',
      category: 'landlord-tips',
      image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGF4fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      slug: 'top-tax-deductions-rental-property-owners'
    },
    {
      id: '6',
      title: 'How to Handle Difficult Tenant Situations',
      excerpt: 'Learn professional strategies for managing challenging tenant interactions while staying within legal boundaries.',
      date: 'January 20, 2023',
      author: 'David Martinez',
      authorRole: 'Senior Property Manager',
      category: 'property-management',
      image: 'https://images.unsplash.com/photo-1573497161079-f3fd25cc6b90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGNvbnZlcnNhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      slug: 'handle-difficult-tenant-situations'
    }
  ];

  // Filter posts based on search term and active category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div key={post.id} className="reveal bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{post.date} | {post.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>
                  <h3 className="text-xl font-bold mb-2 text-yrealty-navy">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center text-gray-700 font-bold mr-3">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{post.author}</div>
                      <div className="text-xs text-gray-500">{post.authorRole}</div>
                    </div>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="text-yrealty-accent font-medium hover:underline">
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No posts found matching your criteria</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter settings</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPostsList;
