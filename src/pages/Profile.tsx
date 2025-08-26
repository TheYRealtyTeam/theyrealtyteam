
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import PageLayout from '@/components/layout/PageLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface ProfileData {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/');
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        
        // Use proper Supabase client to fetch from profiles table
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          throw error;
        }
        
        if (data) {
          const profileData: ProfileData = {
            id: data.id,
            username: data.username,
            full_name: data.full_name,
            avatar_url: data.avatar_url
          };
          
          setProfile(profileData);
          setUsername(profileData.username || '');
          setFullName(profileData.full_name || '');
        } else {
          // Create profile if it doesn't exist
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              username: null,
              full_name: null,
              avatar_url: null
            });
          
          if (insertError) {
            // Error creating profile - continue without profile data
          }
        }
      } catch (error: any) {
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setUpdating(true);
    try {
      // Use proper Supabase client to update profiles table
      const { error } = await supabase
        .from('profiles')
        .update({
          username: username || null,
          full_name: fullName || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }
      
      toast.success('Profile updated successfully');
      
      // Update local profile state
      setProfile(prev => prev ? {
        ...prev,
        username,
        full_name: fullName
      } : null);
      
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <PageLayout title="Profile" metaDescription="Manage your Y Realty Team profile settings">
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-yrealty-accent" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="Your Profile" 
      subtitle="Manage your account information and settings"
      metaDescription="Manage your Y Realty Team profile settings and account information"
    >
      <div className="max-w-xl mx-auto py-8 tablet-container tablet-section-padding">
        <Card className="mb-8 tablet-card tablet-hover">
          <CardHeader className="tablet-content-spacing">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20 md:h-24 md:w-24 border-2 border-yrealty-accent">
                <AvatarImage src={profile?.avatar_url || ''} />
                <AvatarFallback className="bg-yrealty-navy text-white text-xl md:text-2xl">
                  {fullName ? fullName.substring(0, 2).toUpperCase() : user?.email?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="tablet-text-scale text-2xl md:text-3xl">{fullName || 'Account User'}</CardTitle>
                <CardDescription className="tablet-large-text text-lg">{user?.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <form onSubmit={handleUpdateProfile}>
            <CardContent className="space-y-6 tablet-space-y-8">
              <div className="space-y-3">
                <Label htmlFor="fullName" className="tablet-large-text text-base font-semibold">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  maxLength={100}
                  className="tablet-form-input text-lg py-3"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="username" className="tablet-large-text text-base font-semibold">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username"
                  maxLength={50}
                  className="tablet-form-input text-lg py-3"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="email" className="tablet-large-text text-base font-semibold">Email</Label>
                <Input
                  id="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-gray-100 tablet-form-input text-lg py-3"
                />
                <p className="text-sm text-gray-500 tablet-body-text">Email cannot be changed</p>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 tablet-content-spacing pt-6">
              <Button type="submit" disabled={updating} className="tablet-btn w-full sm:w-auto">
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
              
              <Button variant="outline" type="button" onClick={handleSignOut} className="tablet-btn w-full sm:w-auto">
                Sign Out
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Profile;
