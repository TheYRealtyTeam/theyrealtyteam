import { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { warn } from '@/lib/logger';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AppRole } from '@/types/auth';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  userRoles: AppRole[];
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, userData: { full_name?: string, username?: string }) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  setSessionAndUser: (session: Session | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userRoles, setUserRoles] = useState<AppRole[]>([]);

  // Helper function to fetch user roles
  const fetchUserRoles = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (error) {
        warn('Error fetching user roles:', error);
        return [];
      }

      return (data || []).map(r => r.role as AppRole);
    } catch (err) {
      warn('Error fetching user roles:', err);
      return [];
    }
  };

  useEffect(() => {
    let initialLoadCompleted = false;
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Fetch roles when user signs in (deferred to avoid blocking)
        if (currentSession?.user) {
          setTimeout(() => {
            fetchUserRoles(currentSession.user.id).then(setUserRoles);
          }, 0);
        } else {
          setUserRoles([]);
        }
        
        // Show toast message on successful sign in/out (only after initial load)
        if (initialLoadCompleted) {
          if (event === 'SIGNED_IN') {
            toast.success('Successfully signed in!');
          } else if (event === 'SIGNED_OUT') {
            toast.success('Successfully signed out!');
          }
        }
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          warn('Auth session error:', error);
        }
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Fetch user roles if session exists
        if (currentSession?.user) {
          const roles = await fetchUserRoles(currentSession.user.id);
          setUserRoles(roles);
        }
      } catch (err) {
        warn('Auth initialization error:', err);
      } finally {
        setLoading(false);
        initialLoadCompleted = true;
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signUp = async (email: string, password: string, userData: { full_name?: string, username?: string }) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: userData.full_name || '',
            username: userData.username || '',
          },
        },
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      // Ignore sign out errors
    }
  };

  const setSessionAndUser = (newSession: Session | null) => {
    setSession(newSession);
    setUser(newSession?.user ?? null);
    if (newSession?.user) {
      setTimeout(() => {
        fetchUserRoles(newSession.user.id).then(setUserRoles);
      }, 0);
    } else {
      setUserRoles([]);
    }
  };

  const isAdmin = userRoles.includes('admin');

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        userRoles,
        isAdmin,
        signIn,
        signUp,
        signOut,
        setSessionAndUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    // Return a default context instead of throwing an error
    // This allows the app to function without authentication
    return {
      session: null,
      user: null,
      loading: false,
      userRoles: [] as AppRole[],
      isAdmin: false,
      signIn: async () => ({ error: new Error('Auth not available') }),
      signUp: async () => ({ error: new Error('Auth not available') }),
      signOut: async () => {},
      setSessionAndUser: () => {}
    };
  }
  
  return context;
};
