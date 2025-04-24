
import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import BlogPostsList from '@/components/BlogPostsList';
import { Search, FileText, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    document.title = "Blog | Y Realty Team";
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'property-management', label: 'Property Management' },
    { id: 'market-trends', label: 'Market Trends' },
    { id: 'landlord-tips', label: 'Landlord Tips' },
    { id: 'investment', label: 'Investment' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'technology', label: 'PropTech' },
    { id: 'sustainability', label: 'Sustainability' }
  ];

  // Featured article
  const featuredArticle = {
    title: "2025 Real Estate Market Outlook: Technology, Sustainability, and ROI",
    excerpt: "Our comprehensive analysis of what property investors and managers need to know about the year ahead, with insights from industry leaders and data-driven predictions.",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cmVhbCUyMGVzdGF0ZSUyMG1hcmtldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    slug: "2025-real-estate-market-outlook",
    date: "April 18, 2025"
  };

  const handleCategoryChange = (categoryId) => {
    console.log("Setting active category to:", categoryId);
    setActiveCategory(categoryId);
  };

  return (
    <PageLayout 
      title="2025 Property Management Insights"
      subtitle="Stay ahead of the curve with our latest property management trends, AI-driven strategies, and market forecasts"
    >
      <div className="space-y-8">
        {/* Featured Article */}
        <div className="bg-yrealty-blue/20 rounded-xl overflow-hidden shadow-lg mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-64 lg:h-auto relative">
              <img 
                src={featuredArticle.image} 
                alt={featuredArticle.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-yrealty-navy text-white text-xs font-bold px-3 py-1 rounded-full">
                FEATURED
              </div>
            </div>
            <div className="p-6 lg:p-8 flex flex-col justify-center">
              <div className="text-sm text-gray-500 mb-2">{featuredArticle.date} | Market Analysis</div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-yrealty-navy">{featuredArticle.title}</h2>
              <p className="text-gray-600 mb-6">{featuredArticle.excerpt}</p>
              <Link to={`/blog/${featuredArticle.slug}`}>
                <Button className="bg-yrealty-navy hover:bg-yrealty-navy/90 w-full sm:w-auto">
                  <FileText className="mr-2" />
                  Read Full Analysis
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yrealty-accent focus:border-transparent"
            />
            <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
          </div>
        </div>
        
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="flex flex-wrap justify-center gap-2 w-full max-w-4xl">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-yrealty-navy text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <BlogPostsList searchTerm={searchTerm} activeCategory={activeCategory} />

        <div className="text-center mt-12 mb-8">
          <div className="inline-flex items-center text-yrealty-navy hover:underline">
            <Rss className="w-5 h-5 mr-2" />
            <span>Subscribe to our blog updates</span>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/resources">
            <Button variant="outline" className="border-yrealty-navy text-yrealty-navy hover:bg-yrealty-blue">
              View Our Free Property Management Resources
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default Blog;
