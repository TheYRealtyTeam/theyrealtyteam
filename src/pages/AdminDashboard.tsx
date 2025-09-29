import React, { useState, useEffect } from 'react';
import { log } from '@/lib/logger';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { 
  FileText, 
  Users, 
  Calendar, 
  BarChart3, 
  Shield, 
  Settings,
  MessageSquare,
  Upload,
  TrendingUp,
  Database
} from 'lucide-react';
import BlogManagement from '@/components/admin/BlogManagement';
import ContactManagement from '@/components/admin/ContactManagement';
import AppointmentManagement from '@/components/admin/AppointmentManagement';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import SystemMonitoring from '@/components/admin/SystemMonitoring';
import ResourceManagement from '@/components/admin/ResourceManagement';
import PropertyManagement from '@/components/admin/PropertyManagement';

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [dashboardStats, setDashboardStats] = useState([
    { title: "Total Properties", value: "Loading...", icon: Database, trend: "Calculating..." },
    { title: "Total Blog Posts", value: "Loading...", icon: FileText, trend: "Calculating..." },
    { title: "Contact Submissions", value: "Loading...", icon: MessageSquare, trend: "Calculating..." },
    { title: "Appointments", value: "Loading...", icon: Calendar, trend: "Calculating..." },
  ]);

  useEffect(() => {
    log('[AdminDashboard] auth state', { loading, hasUser: !!user });
  }, [user, loading]);

  useEffect(() => {
    // Only fetch data if user is authenticated
    if (!user) return;
    
    const fetchDashboardData = async () => {
      try {
        // Fetch all counts in parallel
        const [properties, blogPosts, contactSubmissions, appointments] = await Promise.all([
          supabase.from('properties').select('id', { count: 'exact', head: true }),
          supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
          supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
          supabase.from('appointments').select('id', { count: 'exact', head: true })
        ]);

        // Calculate trends based on last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const [recentProperties, recentBlogPosts, recentContacts, recentAppts] = await Promise.all([
          supabase.from('properties').select('id', { count: 'exact', head: true })
            .gte('created_at', thirtyDaysAgo.toISOString()),
          supabase.from('blog_posts').select('id', { count: 'exact', head: true })
            .gte('created_at', thirtyDaysAgo.toISOString()),
          supabase.from('contact_submissions').select('id', { count: 'exact', head: true })
            .gte('created_at', thirtyDaysAgo.toISOString()),
          supabase.from('appointments').select('id', { count: 'exact', head: true })
            .gte('created_at', thirtyDaysAgo.toISOString())
        ]);

        const calculateTrend = (total: number, recent: number) => {
          if (total === 0) return "0%";
          const percentage = Math.round((recent / total) * 100);
          return `+${percentage}% recent`;
        };

        setDashboardStats([
          { 
            title: "Total Properties", 
            value: (properties.count || 0).toString(), 
            icon: Database, 
            trend: calculateTrend(properties.count || 0, recentProperties.count || 0)
          },
          { 
            title: "Total Blog Posts", 
            value: (blogPosts.count || 0).toString(), 
            icon: FileText, 
            trend: calculateTrend(blogPosts.count || 0, recentBlogPosts.count || 0)
          },
          { 
            title: "Contact Submissions", 
            value: (contactSubmissions.count || 0).toString(), 
            icon: MessageSquare, 
            trend: calculateTrend(contactSubmissions.count || 0, recentContacts.count || 0)
          },
          { 
            title: "Appointments", 
            value: (appointments.count || 0).toString(), 
            icon: Calendar, 
            trend: calculateTrend(appointments.count || 0, recentAppts.count || 0)
          },
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setDashboardStats([
          { title: "Total Properties", value: "Error", icon: Database, trend: "Failed to load" },
          { title: "Total Blog Posts", value: "Error", icon: FileText, trend: "Failed to load" },
          { title: "Contact Submissions", value: "Error", icon: MessageSquare, trend: "Failed to load" },
          { title: "Appointments", value: "Error", icon: Calendar, trend: "Failed to load" },
        ]);
      }
    };

    fetchDashboardData();
  }, [user]); // Run when user changes

  // Wait for auth to finish, then redirect if needed
  if (loading) {
    return (
      <PageLayout title="Admin Dashboard" subtitle="Loading admin access...">
        <div className="py-12 text-center text-muted-foreground">Checking permissions...</div>
      </PageLayout>
    );
  }
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <PageLayout
      title="Admin Dashboard" 
      subtitle="Manage your property management platform"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Properties
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {dashboardStats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.trend} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Rate Limit Events</span>
                      <span className="text-sm font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Security Logs</span>
                      <span className="text-sm font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">System Status</span>
                      <span className="text-sm font-medium text-green-600">Healthy</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <div className="font-medium">New contact submission</div>
                      <div className="text-muted-foreground">2 hours ago</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">Appointment scheduled</div>
                      <div className="text-muted-foreground">4 hours ago</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">Blog post published</div>
                      <div className="text-muted-foreground">1 day ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setActiveTab("properties")}
                      className="w-full text-left text-sm bg-muted hover:bg-muted/80 px-3 py-2 rounded-md transition-colors"
                    >
                      Manage Properties
                    </button>
                    <button 
                      onClick={() => setActiveTab("content")}
                      className="w-full text-left text-sm bg-muted hover:bg-muted/80 px-3 py-2 rounded-md transition-colors"
                    >
                      Manage Blog Posts
                    </button>
                    <button 
                      onClick={() => setActiveTab("customers")}
                      className="w-full text-left text-sm bg-muted hover:bg-muted/80 px-3 py-2 rounded-md transition-colors"
                    >
                      Review Contact Forms
                    </button>
                    <button 
                      onClick={() => setActiveTab("system")}
                      className="w-full text-left text-sm bg-muted hover:bg-muted/80 px-3 py-2 rounded-md transition-colors"
                    >
                      System Monitoring
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="properties">
            <PropertyManagement />
          </TabsContent>

          <TabsContent value="content">
            <div className="space-y-6">
              <BlogManagement />
              <ResourceManagement />
            </div>
          </TabsContent>

          <TabsContent value="customers">
            <ContactManagement />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="system">
            <SystemMonitoring />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AdminDashboard;