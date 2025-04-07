
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPostsList from '@/components/BlogPostsList';
import AnimationObserver from '@/utils/AnimationObserver';
import { Search } from 'lucide-react';

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
    { id: 'maintenance', label: 'Maintenance' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="pt-24 pb-12 bg-yrealty-blue">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold text-yrealty-navy text-center">2025 Property Management Insights</h1>
            <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
              Stay ahead of the curve with our latest property management trends, strategies, and market forecasts
            </p>
            
            <div className="mt-8 max-w-2xl mx-auto">
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
            
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
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
        </div>
        
        <BlogPostsList searchTerm={searchTerm} activeCategory={activeCategory} />
      </main>
      <Footer />
      <AnimationObserver />
    </div>
  );
};

export default Blog;
