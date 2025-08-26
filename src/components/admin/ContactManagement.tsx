import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactSubmission } from '@/types/admin';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Calendar,
  User,
  Home,
  Eye,
  CheckCircle,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';

const ContactManagement = () => {
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  useEffect(() => {
    const fetchContactSubmissions = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setContactSubmissions(data || []);
      } catch (error: any) {
        console.error('Failed to fetch contact submissions:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContactSubmissions();
  }, []);

  const fetchContactSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContactSubmissions(data || []);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error('Failed to fetch contact submissions: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    setIsDetailDialogOpen(true);
  };

  const getPropertyTypeIcon = (propertyType: string) => {
    return <Home className="h-4 w-4" />;
  };

  const getPropertyTypeBadge = (propertyType: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'Single Family': 'default',
      'Multi-Family': 'secondary',
      'Commercial': 'outline',
      'Luxury': 'destructive'
    };
    return <Badge variant={variants[propertyType] || 'outline'}>{propertyType}</Badge>;
  };

  if (loading) {
    return <div className="text-center py-8">Loading contact submissions...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Contact Management
          </CardTitle>
          <CardDescription>
            View and manage customer contact submissions and inquiries
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Summary Stats */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{contactSubmissions.length}</p>
                    <p className="text-sm text-muted-foreground">Total Submissions</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {contactSubmissions.filter(c => 
                        new Date(c.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                      ).length}
                    </p>
                    <p className="text-sm text-muted-foreground">This Week</p>
                  </div>
                  <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {contactSubmissions.filter(c => 
                        new Date(c.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
                      ).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Today</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Submissions Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Property Type</TableHead>
                  <TableHead>Message Preview</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contactSubmissions.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{contact.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{contact.email}</span>
                        </div>
                        {contact.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{contact.phone}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getPropertyTypeIcon(contact.property_type)}
                        {getPropertyTypeBadge(contact.property_type)}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm truncate" title={contact.message}>
                        {contact.message}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {format(new Date(contact.created_at), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(contact)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {contactSubmissions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No contact submissions found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Submission Details</DialogTitle>
            <DialogDescription>
              Full details of the contact submission
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedContact.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a 
                        href={`mailto:${selectedContact.email}`}
                        className="text-primary hover:underline"
                      >
                        {selectedContact.email}
                      </a>
                    </div>
                    {selectedContact.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={`tel:${selectedContact.phone}`}
                          className="text-primary hover:underline"
                        >
                          {selectedContact.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Property Details</h4>
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    {getPropertyTypeBadge(selectedContact.property_type)}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Message</h4>
                <div className="bg-muted p-4 rounded-md">
                  <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <span className="font-medium">Submitted:</span> {format(new Date(selectedContact.created_at), 'PPpp')}
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span> {format(new Date(selectedContact.updated_at), 'PPpp')}
                </div>
              </div>

              <div className="flex gap-2">
                <Button asChild>
                  <a href={`mailto:${selectedContact.email}?subject=Re: Your Property Inquiry`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Reply via Email
                  </a>
                </Button>
                {selectedContact.phone && (
                  <Button variant="outline" asChild>
                    <a href={`tel:${selectedContact.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactManagement;