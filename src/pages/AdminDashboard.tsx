import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
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

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  const dashboardStats = [
    { title: "Total Blog Posts", value: "45", icon: FileText, trend: "+12%" },
    { title: "Contact Submissions", value: "28", icon: MessageSquare, trend: "+5%" },
    { title: "Appointments", value: "12", icon: Calendar, trend: "+8%" },
    { title: "Resources", value: "6", icon: Upload, trend: "0%" },
  ];

  return (
    <PageLayout 
      title="Admin Dashboard" 
      subtitle="Manage your property management platform"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
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