import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye,
  Calendar,
  MessageSquare,
  FileText,
  Activity
} from 'lucide-react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [analyticsData, setAnalyticsData] = useState({
    blogPosts: { total: 0, recent: 0 },
    contacts: { total: 0, recent: 0 },
    appointments: { total: 0, recent: 0 },
    topCategories: [] as Array<{ category: string; count: number }>,
    recentActivity: [] as Array<{ type: string; title: string; date: string }>
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const getDateRange = () => {
    const now = new Date();
    const days = parseInt(timeRange.replace('d', ''));
    return {
      start: startOfDay(subDays(now, days)),
      end: endOfDay(now)
    };
  };

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const { start, end } = getDateRange();

      // Fetch blog posts data
      const { data: blogPosts, error: blogError } = await supabase
        .from('blog_posts')
        .select('category, created_at');

      if (blogError) throw blogError;

      // Fetch contact submissions data
      const { data: contacts, error: contactError } = await supabase
        .from('contact_submissions')
        .select('created_at, name');

      if (contactError) throw contactError;

      // Fetch appointments data
      const { data: appointments, error: appointmentError } = await supabase
        .from('appointments')
        .select('created_at, name, status');

      if (appointmentError) throw appointmentError;

      // Process data
      const recentBlogPosts = blogPosts.filter(post => 
        new Date(post.created_at) >= start && new Date(post.created_at) <= end
      );

      const recentContacts = contacts.filter(contact => 
        new Date(contact.created_at) >= start && new Date(contact.created_at) <= end
      );

      const recentAppointments = appointments.filter(appointment => 
        new Date(appointment.created_at) >= start && new Date(appointment.created_at) <= end
      );

      // Calculate category distribution
      const categoryCount = blogPosts.reduce((acc: { [key: string]: number }, post) => {
        acc[post.category] = (acc[post.category] || 0) + 1;
        return acc;
      }, {});

      const topCategories = Object.entries(categoryCount)
        .map(([category, count]) => ({ category, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Create recent activity timeline
      const recentActivity = [
        ...recentBlogPosts.map(post => ({
          type: 'blog',
          title: 'New blog post published',
          date: post.created_at
        })),
        ...recentContacts.map(contact => ({
          type: 'contact',
          title: `Contact from ${contact.name}`,
          date: contact.created_at
        })),
        ...recentAppointments.map(appointment => ({
          type: 'appointment',
          title: `Appointment with ${appointment.name}`,
          date: appointment.created_at
        }))
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

      setAnalyticsData({
        blogPosts: {
          total: blogPosts.length,
          recent: recentBlogPosts.length
        },
        contacts: {
          total: contacts.length,
          recent: recentContacts.length
        },
        appointments: {
          total: appointments.length,
          recent: recentAppointments.length
        },
        topCategories,
        recentActivity
      });

    } catch (error: any) {
      console.error('Failed to fetch analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'blog':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'contact':
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case 'appointment':
        return <Calendar className="h-4 w-4 text-purple-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Analytics Dashboard
              </CardTitle>
              <CardDescription>
                Track website performance and user engagement metrics
              </CardDescription>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{analyticsData.blogPosts.total}</p>
                    <p className="text-sm text-muted-foreground">Total Blog Posts</p>
                    {analyticsData.blogPosts.recent > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-500">
                          +{analyticsData.blogPosts.recent} recent
                        </span>
                      </div>
                    )}
                  </div>
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{analyticsData.contacts.total}</p>
                    <p className="text-sm text-muted-foreground">Contact Submissions</p>
                    {analyticsData.contacts.recent > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-500">
                          +{analyticsData.contacts.recent} recent
                        </span>
                      </div>
                    )}
                  </div>
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{analyticsData.appointments.total}</p>
                    <p className="text-sm text-muted-foreground">Appointments</p>
                    {analyticsData.appointments.recent > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-500">
                          +{analyticsData.appointments.recent} recent
                        </span>
                      </div>
                    )}
                  </div>
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Top Blog Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Blog Categories</CardTitle>
                <CardDescription>Most published content categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.topCategories.map((category, index) => (
                    <div key={category.category} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          #{index + 1}
                        </span>
                        <span className="text-sm">{category.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{category.count} posts</Badge>
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ 
                              width: `${(category.count / analyticsData.topCategories[0]?.count || 1) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {analyticsData.topCategories.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No blog posts found
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Latest platform activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {analyticsData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(activity.date), 'MMM dd, yyyy • HH:mm')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {analyticsData.recentActivity.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No recent activity found
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Engagement Summary */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Engagement Summary</CardTitle>
              <CardDescription>
                Overview of user engagement across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {analyticsData.blogPosts.total}
                  </div>
                  <div className="text-sm text-muted-foreground">Content Pieces</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {analyticsData.contacts.total}
                  </div>
                  <div className="text-sm text-muted-foreground">Lead Inquiries</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {analyticsData.appointments.total}
                  </div>
                  <div className="text-sm text-muted-foreground">Consultations</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.round(((analyticsData.contacts.total + analyticsData.appointments.total) / Math.max(analyticsData.blogPosts.total, 1)) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Conversion Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;