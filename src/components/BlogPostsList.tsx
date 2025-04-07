
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

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
  // Updated blog posts data with current dates and latest property management trends for 2025
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'AI-Driven Property Management: The 2025 Revolution',
      excerpt: 'Discover how artificial intelligence is transforming property management through predictive maintenance, tenant matching, and automated operations.',
      date: 'April 5, 2025',
      author: 'Sarah Johnson',
      authorRole: 'Technology Integration Specialist',
      category: 'property-management',
      image: '/lovable-uploads/fa060ee1-c950-4da6-967a-e96386839d05.png',
      slug: 'ai-driven-property-management-2025'
    },
    {
      id: '2',
      title: 'Smart Home Features That Increase Rental Value in 2025',
      excerpt: "The latest smart home technologies that tenants are willing to pay premium rents for, and the ROI landlords can expect from these investments.",
      date: 'March 28, 2025',
      author: 'Michael Chen',
      authorRole: 'Property Tech Advisor',
      category: 'landlord-tips',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNtYXJ0JTIwaG9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      slug: 'smart-home-features-increase-rental-value-2025'
    },
    {
      id: '3',
      title: 'Climate Resilience: Preparing Rental Properties for Extreme Weather',
      excerpt: 'How property owners can retrofit and prepare their investments to withstand increasingly frequent extreme weather events while maintaining property value.',
      date: 'March 15, 2025',
      author: 'Jennifer Williams',
      authorRole: 'Sustainability Consultant',
      category: 'maintenance',
      image: 'https://images.unsplash.com/photo-1572204292164-b35ba943fca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xpbWF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      slug: 'climate-resilience-rental-properties-2025'
    },
    {
      id: '4',
      title: 'The Remote Landlord: Managing Properties From Anywhere in 2025',
      excerpt: 'The latest digital tools and strategies that make it possible to effectively manage rental properties from anywhere in the world.',
      date: 'March 2, 2025',
      author: 'Robert Thompson',
      authorRole: 'Digital Nomad & Property Investor',
      category: 'property-management',
      image: 'https://images.unsplash.com/photo-1598986646512-9330bcc4c0dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHJlbW90ZSUyMHdvcmt8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      slug: 'remote-landlord-managing-properties-anywhere-2025'
    },
    {
      id: '5',
      title: '2025 Real Estate Investment Hotspots: Data-Driven Analysis',
      excerpt: "Our comprehensive analysis of emerging markets with the highest growth potential for real estate investors in the coming year.",
      date: 'February 18, 2025',
      author: 'Lisa Garcia',
      authorRole: 'Investment Analyst',
      category: 'investment',
      image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW52ZXN0bWVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      slug: 'real-estate-investment-hotspots-2025'
    },
    {
      id: '6',
      title: 'Rental Market Forecast: Supply, Demand, and Pricing Trends for 2025-2026',
      excerpt: 'An in-depth look at the factors driving the rental market in 2025 and what property owners should expect in the year ahead.',
      date: 'February 5, 2025',
      author: 'David Martinez',
      authorRole: 'Market Research Director',
      category: 'market-trends',
      image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cmVhbCUyMGVzdGF0ZSUyMG1hcmtldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      slug: 'rental-market-forecast-2025-2026'
    },
    {
      id: '7',
      title: 'ESG Compliance in Property Management: The 2025 Standards',
      excerpt: 'How new Environmental, Social, and Governance standards are reshaping property management practices and what you need to know to stay compliant.',
      date: 'January 22, 2025',
      author: 'Amara Patel',
      authorRole: 'Compliance Officer',
      category: 'landlord-tips',
      image: 'https://images.unsplash.com/photo-1587929501535-1e2d559f2385?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZW52aXJvbm1lbnRhbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      slug: 'esg-compliance-property-management-2025'
    },
    {
      id: '8',
      title: 'The Rise of Co-living Spaces: Management Strategies for 2025',
      excerpt: 'Exploring the growing trend of co-living arrangements and how property managers can capitalize on this market shift.',
      date: 'January 10, 2025',
      author: 'Thomas Wright',
      authorRole: 'Urban Housing Specialist',
      category: 'market-trends',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y28lMjBsaXZpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      slug: 'coliving-spaces-management-strategies-2025'
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
              <Card key={post.id} className="reveal overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="h-48 w-full overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback image if the original fails to load
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60';
                    }}
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {post.date} | {post.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </div>
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
                </CardContent>
              </Card>
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
