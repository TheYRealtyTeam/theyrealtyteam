
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import PageLayout from '@/components/layout/PageLayout';
import BlogPostsList from '@/components/BlogPostsList';
import CategoryFilter from '@/components/blog/CategoryFilter';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const categories = [
    'property-management',
    'tenant-relations',
    'investment-advice',
    'maintenance',
    'market-trends',
    'technology'
  ];
  
  const canonicalUrl = 'https://yrealtyteam.com/blog';
  const blogDescription = 'Expert insights on property management, real estate investment, market trends, and tenant relations. Stay informed with the latest industry knowledge from Y Realty Team professionals.';

  useEffect(() => {
    document.title = 'Real Estate Blog | Y Realty Team - Property Management Insights';
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Y Realty Team Blog",
    "description": blogDescription,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Y Realty Team",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yrealtyteam.com/lovable-uploads/logo-96x96.png"
      }
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Real Estate Blog | Y Realty Team - Property Management Insights</title>
        <meta name="title" content="Property Management & Real Estate Investment Blog" />
        <meta name="description" content={blogDescription} />
        <meta name="keywords" content="property management, real estate investment, rental properties, tenant relations, market trends, property maintenance" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content="Y Realty Team Blog - Property Management Insights" />
        <meta property="og:description" content={blogDescription} />
        <meta property="og:site_name" content="Y Realty Team" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content="Y Realty Team Blog" />
        <meta name="twitter:description" content={blogDescription} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <PageLayout 
        title="Property Management Insights" 
        subtitle="Expert advice, market trends, and practical tips for property owners and investors"
      >
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-yrealty-navy focus:border-transparent"
              />
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Blog Posts List */}
        <BlogPostsList searchTerm={searchTerm} category={selectedCategory} />

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-yrealty-navy to-yrealty-accent p-8 rounded-2xl text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Optimize Your Property Investment?
            </h3>
            <p className="text-lg mb-6 opacity-95 max-w-2xl mx-auto">
              Put these insights into action with Y Realty Team's comprehensive property management services.
            </p>
            <Link to="/contact" className="btn-accent bg-white text-yrealty-navy hover:bg-gray-100 text-lg px-8 py-4 font-bold">
              Get Expert Management
            </Link>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Blog;
