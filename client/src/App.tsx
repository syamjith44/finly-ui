import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth, AuthProvider } from "@/hooks/use-auth";
import AuthPage from "@/pages/auth";
import HomePage from "@/pages/home";
import DashboardAnalytics from "@/pages/dashboard-analytics";
import NotFound from "@/pages/not-found";

export function ProtectedRoute(
  { path, component }: { path: string; component: any }
) {
  const { user } = useAuth();

  if (!user) return <Redirect to="/auth" />;
  return <Route path={path} component={component} />;
}

export function LoggedInUserRoute(
  { path, component }: { path: string; component: any }
) {
  const { user } = useAuth();

  if (user) return <Redirect to="/" />;
  return <Route path={path} component={component} />;
}



function Router() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-glow">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg glow-effect"></div>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      <ProtectedRoute path="/" component={HomePage} />
      <LoggedInUserRoute path="/auth" component={AuthPage} />
      <ProtectedRoute path="/dashboard" component={DashboardAnalytics} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="min-h-screen text-white">
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
