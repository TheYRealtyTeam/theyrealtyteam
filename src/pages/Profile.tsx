
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageLayout from '@/components/layout/PageLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [updating, setUpdating] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [fullName, setFullName] = React.useState('');

  React.useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/');
      return;
    }

    // For now, just use the user data from auth
    setFullName(user.user_metadata?.full_name || '');
    setUsername(user.user_metadata?.username || '');
    setLoading(false);
  }, [user, navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setUpdating(true);
    try {
      // For now, just show a message that profile updates are not yet implemented
      toast.success('Profile update feature coming soon!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
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
      <div className="max-w-xl mx-auto py-8">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-yrealty-accent">
                <AvatarImage src="" />
                <AvatarFallback className="bg-yrealty-navy text-white text-xl">
                  {fullName ? fullName.substring(0, 2).toUpperCase() : user?.email?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{fullName || 'Account User'}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <form onSubmit={handleUpdateProfile}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  maxLength={100}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username"
                  maxLength={50}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-gray-100"
                />
                <p className="text-xs text-gray-500">Email cannot be changed</p>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button type="submit" disabled={updating}>
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
              
              <Button variant="outline" type="button" onClick={handleSignOut}>
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
