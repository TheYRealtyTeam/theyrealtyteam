
import * as React from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

console.log('AuthContext - React available:', !!React);
console.log('AuthContext - React.useState available:', !!React.useState);

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, userData: { full_name?: string, username?: string }) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  setSessionAndUser: (session: Session | null) => void;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('AuthProvider rendering - React:', !!React);
  
  const [session, setSession] = React.useState<Session | null>(null);
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    let mounted = true;

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        if (!mounted) return;
        
        console.log('Auth state changed', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Show toast message on successful sign in/out (only when not loading)
        if (!loading) {
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
        if (!mounted) return;
        setLoading(true);
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          // Don't throw error, just log it and continue
        }
        
        if (mounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Continue without auth if there's an error
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
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
      console.error('Error signing in:', error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, userData: { full_name?: string, username?: string }) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name || '',
            username: userData.username || '',
          },
        },
      });
      return { error };
    } catch (error) {
      console.error('Error signing up:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const setSessionAndUser = (newSession: Session | null) => {
    setSession(newSession);
    setUser(newSession?.user ?? null);
  };

  return React.createElement(
    AuthContext.Provider,
    {
      value: {
        session,
        user,
        loading,
        signIn,
        signUp,
        signOut,
        setSessionAndUser
      }
    },
    children
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  
  if (context === undefined) {
    // Return a default context instead of throwing an error
    // This allows the app to function without authentication
    console.warn('useAuth used outside of AuthProvider - returning default values');
    return {
      session: null,
      user: null,
      loading: false,
      signIn: async () => ({ error: new Error('Auth not available') }),
      signUp: async () => ({ error: new Error('Auth not available') }),
      signOut: async () => {},
      setSessionAndUser: () => {}
    };
  }
  
  return context;
};
