import { HolographicButton } from "@/components/ui/holographic-button";
import { useAuth } from "@/hooks/use-auth";
import { User, BarChart3, MessageSquare, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";

export function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="holographic-border sticky top-0 z-50 m-4">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg glow-effect"></div>
            <span className="text-xl font-bold neon-glow">FinanceAI</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="hover:text-blue-400 transition-colors flex items-center">
              <BarChart3 className="w-4 h-4 mr-1" />
              Dashboard
            </Link>
            <HolographicButton onClick={logout} className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Logout
            </HolographicButton>
          </div>
          <button className="md:hidden text-blue-400">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
