
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, userData: { full_name?: string, username?: string }) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  setSessionAndUser: (session: Session | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log("AuthProvider: Component initializing");
  
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("AuthProvider: Setting up auth state listener");
    
    let mounted = true;

    const initializeAuth = async () => {
      if (!mounted) return;
      
      try {
        console.log("AuthProvider: Initializing auth");
        setLoading(true);
        
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }
        
        if (mounted) {
          console.log("AuthProvider: Setting initial session", currentSession?.user?.email || 'none');
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        if (mounted) {
          setLoading(false);
          console.log("AuthProvider: Auth initialization complete");
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, currentSession?.user?.email || 'none');
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (!loading) {
          if (event === 'SIGNED_IN') {
            toast.success('Successfully signed in!');
          } else if (event === 'SIGNED_OUT') {
            toast.success('Successfully signed out!');
          }
        }
      }
    );

    initializeAuth();

    return () => {
      console.log("AuthProvider: Cleaning up");
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loading]);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("AuthProvider: Attempting sign in");
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
      console.log("AuthProvider: Attempting sign up");
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
      console.log("AuthProvider: Attempting sign out");
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const setSessionAndUser = (newSession: Session | null) => {
    console.log("AuthProvider: Manually setting session", newSession?.user?.email || 'none');
    setSession(newSession);
    setUser(newSession?.user ?? null);
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    setSessionAndUser
  };

  console.log("AuthProvider: Rendering with loading:", loading, "user:", user?.email || 'none');

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
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
