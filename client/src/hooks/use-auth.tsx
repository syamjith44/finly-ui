import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";
import { User } from "client/src/types/financial";
import { api } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, navigate] = useLocation(); 

  useEffect(() => {
    const storedUser = localStorage.getItem("financeai_user");
    const storedToken = localStorage.getItem("access_token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("access_token", token);
    const user = await api.auth.getUserSettings();
    const currentUser: User = {
      id: user._id,
      email: user.email,
      mobile_number: user.mobile_number
    };
    setUser(currentUser);
    localStorage.setItem("financeai_user", JSON.stringify(currentUser));
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("financeai_user");
    localStorage.removeItem("access_token");
    navigate("/auth");
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
