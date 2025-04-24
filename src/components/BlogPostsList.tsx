
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
  // Define static blog posts
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
      category: 'sustainability',
      image: 'https://images.unsplash.com/photo-1572204292164-b35ba943fca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xpbWF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      slug: 'climate-resilience-rental-properties-2025'
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
    },
    {
      id: '9',
      title: 'The Impact of AI in Automated Property Maintenance',
      excerpt: 'How artificial intelligence is revolutionizing maintenance scheduling and predictive repairs in modern property management.',
      date: 'December 28, 2024',
      author: 'Rachel Kim',
      authorRole: 'Maintenance Operations Director',
      category: 'maintenance',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWFpbnRlbmFuY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      slug: 'ai-automated-property-maintenance-2025'
    },
    {
      id: '10',
      title: 'The Future of PropTech: Emerging Technologies for 2025',
      excerpt: 'A deep dive into the newest property technology solutions that are transforming how properties are managed, marketed, and maintained.',
      date: 'December 15, 2024',
      author: 'Jason Lee',
      authorRole: 'PropTech Innovation Lead',
      category: 'technology',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHRlY2hub2xvZ3l8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      slug: 'future-of-proptech-2025'
    }
  ];

  // Simple filtering without useState or useEffect - this will run on every render
  const filteredPosts = blogPosts.filter(post => {
    // Search term matching
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category matching (simplified)
    let matchesCategory = false;
    if (activeCategory === 'all') {
      matchesCategory = true;
    } else {
      matchesCategory = post.category === activeCategory;
    }
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryLabel = (categoryId: string) => {
    return categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <section className="bg-white">
      <div className="container-custom">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="reveal overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                <div className="h-48 w-full overflow-hidden relative">
                  <img 
                    src={post.image} 
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
                      <div className="text-xs text-gray-500">{post.authorRole}</div>
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
            <h3 className="text-xl font-medium text-gray-700">No posts found matching your criteria</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter settings</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPostsList;
