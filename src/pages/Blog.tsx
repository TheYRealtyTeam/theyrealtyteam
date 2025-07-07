import React, { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Link } from 'react-router-dom';
import { Settings, Search, Calendar, User, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Blog = () => {
  useEffect(() => {
    document.title = "Property Management Blog | Y Realty Team";
  }, []);

  const samplePosts = [
    {
      id: 1,
      title: "Property Investment Strategies for 2024",
      excerpt: "Discover the top property investment strategies that are working in today's market environment.",
      category: "Investment Advice",
      author: "Sarah Johnson",
      date: "January 15, 2024",
      image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      title: "Effective Tenant Screening Best Practices",
      excerpt: "Learn how to screen tenants effectively to reduce risk and ensure reliable rental income.",
      category: "Property Management",
      author: "Mike Rodriguez",
      date: "January 10, 2024",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 3,
      title: "Maintenance Scheduling for Maximum ROI",
      excerpt: "Strategic maintenance planning can significantly improve your property's return on investment.",
      category: "Maintenance",
      author: "Jennifer Chen",
      date: "January 8, 2024",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=400"
    }
  ];

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

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search blog posts..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-yrealty-navy focus:border-transparent"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {samplePosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                </div>
                <CardTitle className="text-lg font-bold text-yrealty-navy line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User className="h-3 w-3" />
                    {post.author}
                  </div>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="text-yrealty-accent hover:text-yrealty-navy transition-colors text-sm font-medium flex items-center gap-1"
                  >
                    Read More
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-yrealty-navy to-yrealty-accent p-8 rounded-2xl text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Optimize Your Property Investment?
          </h3>
          <p className="text-lg mb-6 opacity-95 max-w-2xl mx-auto">
            Put these insights into action with Y Realty Team's comprehensive property management services.
          </p>
          <Link to="/contact" className="inline-block bg-white text-yrealty-navy hover:bg-gray-100 text-lg px-8 py-4 font-bold rounded-lg transition-colors">
            Get Expert Management
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default Blog;