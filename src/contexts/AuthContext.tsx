
import React from 'react';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  console.log('AuthProvider: Component initializing...');
  
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(false);

  console.log('AuthProvider: State hooks initialized successfully');

  const login = async (email: string, password: string) => {
    console.log('AuthProvider: Login attempt starting');
    setLoading(true);
    try {
      console.log('Login attempt:', { email, password });
      setUser({ id: '1', email });
      console.log('AuthProvider: Login successful');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('AuthProvider: Logout called');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  console.log('AuthProvider: Rendering with value:', value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
