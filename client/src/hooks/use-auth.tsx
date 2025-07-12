import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@shared/schema";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userId: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // For demo purposes, auto-login with mock user
    const mockUser: User = {
      id: 1,
      email: "demo@financeai.com",
      phone: null,
      isVerified: true,
      createdAt: new Date()
    };
    setUser(mockUser);
    setIsLoading(false);
  }, []);

  const login = (userId: number) => {
    // In a real app, fetch user details here
    const mockUser: User = {
      id: userId,
      email: "user@example.com",
      phone: null,
      isVerified: true,
      createdAt: new Date()
    };
    setUser(mockUser);
    localStorage.setItem("financeai_user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("financeai_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Wrap the main app component
export function withAuth<T extends {}>(Component: React.ComponentType<T>) {
  return function WrappedComponent(props: T) {
    return (
      <AuthProvider>
        <Component {...props} />
      </AuthProvider>
    );
  };
}
