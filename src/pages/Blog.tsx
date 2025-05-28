
import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { blogPosts } from '@/data/blogPosts';
import { Link } from 'react-router-dom';
import { Clock, User, Tag, Settings } from 'lucide-react';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => post.category === selectedCategory));
    }
  }, [selectedCategory]);

  useEffect(() => {
    document.title = "Property Management Blog | Y Realty Team";
  }, []);

  return (
    <PageLayout 
      title="Property Management Insights" 
      subtitle="Expert advice, market trends, and practical tips for property owners and investors"
    >
      <div className="max-w-6xl mx-auto">
        {/* Admin Link */}
        <div className="mb-6 text-right">
          <Link 
            to="/blog-admin" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-yrealty-navy transition-colors"
          >
            <Settings className="h-4 w-4" />
            Admin
          </Link>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-yrealty-navy text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-yrealty-blue hover:text-yrealty-navy'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <Link to={`/blog/${post.slug}`}>
                <img 
                  src={post.image_url} 
                  alt={post.title} 
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="inline-block bg-yrealty-blue text-yrealty-navy px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>

                <Link to={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-bold mb-3 text-yrealty-navy hover:text-yrealty-accent transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                <Link 
                  to={`/blog/${post.slug}`}
                  className="text-yrealty-accent font-medium hover:text-yrealty-navy transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No posts found in this category.</p>
          </div>
        )}

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
  );
};

export default Blog;
