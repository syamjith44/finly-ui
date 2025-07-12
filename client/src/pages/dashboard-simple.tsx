import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/navbar";
import { FinancialTile } from "@/components/ui/financial-tile";
import { ChartPlaceholder } from "@/components/ui/chart-placeholder";
import { AIChat } from "@/components/ui/ai-chat";
import { HolographicInput } from "@/components/ui/holographic-input";
import { HolographicButton } from "@/components/ui/holographic-button";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { 
  DollarSign, 
  CreditCard, 
  AlertTriangle, 
  PiggyBank,
  TrendingUp,
  PieChart,
  Save,
  Settings,
  TestTube
} from "lucide-react";
import { FinancialDataWithTotals } from "@/types/financial";

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Financial form state
  const [financialForm, setFinancialForm] = useState({
    salary: "0",
    sideIncome: "0",
    investments: "0",
    housing: "0",
    food: "0",
    transportation: "0",
    creditCards: "0",
    studentLoans: "0",
    otherLoans: "0"
  });

  // API config state
  const [apiConfig, setApiConfig] = useState({
    baseUrl: "",
    apiKey: "",
    isActive: false
  });

  // Fetch financial data
  const { data: financialData } = useQuery<FinancialDataWithTotals>({
    queryKey: ["/api/financial-data", user?.id],
    enabled: !!user?.id,
  });

  // Fetch API config
  const { data: apiConfigData } = useQuery({
    queryKey: ["/api/config", user?.id],
    enabled: !!user?.id,
  });

  // Update form state when data changes
  useEffect(() => {
    if (financialData) {
      setFinancialForm({
        salary: financialData.salary || "0",
        sideIncome: financialData.sideIncome || "0",
        investments: financialData.investments || "0",
        housing: financialData.housing || "0",
        food: financialData.food || "0",
        transportation: financialData.transportation || "0",
        creditCards: financialData.creditCards || "0",
        studentLoans: financialData.studentLoans || "0",
        otherLoans: financialData.otherLoans || "0"
      });
    }
  }, [financialData]);

  useEffect(() => {
    if (apiConfigData) {
      setApiConfig(apiConfigData);
    }
  }, [apiConfigData]);

  // Update financial data mutation
  const updateFinancialMutation = useMutation({
    mutationFn: (data: any) => api.financial.updateData(user!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/financial-data", user?.id] });
      toast({
        title: "Success",
        description: "Financial data updated successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update financial data",
        variant: "destructive",
      });
    }
  });

  // Update API config mutation
  const updateConfigMutation = useMutation({
    mutationFn: (config: any) => api.config.update(user!.id, config),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/config", user?.id] });
      toast({
        title: "Success",
        description: "API configuration updated successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update API configuration",
        variant: "destructive",
      });
    }
  });

  const handleFinancialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFinancialMutation.mutate(financialForm);
  };

  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfigMutation.mutate(apiConfig);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totals = financialData?.totals || { income: 0, expenses: 0, debt: 0, netWorth: 0 };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Dashboard Overview */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold neon-glow mb-2">Financial Dashboard</h2>
            <p className="text-gray-300">Your complete financial overview powered by AI</p>
          </div>

          {/* Financial Summary Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <FinancialTile
              title="Total Income"
              value={formatCurrency(totals.income)}
              change="+12.5%"
              changePositive={true}
              icon={<DollarSign className="text-white" />}
              iconColor="bg-gradient-to-r from-green-400 to-green-600"
            />
            
            <FinancialTile
              title="Total Expenses"
              value={formatCurrency(totals.expenses)}
              change="+8.2%"
              changePositive={false}
              icon={<CreditCard className="text-white" />}
              iconColor="bg-gradient-to-r from-red-400 to-red-600"
            />
            
            <FinancialTile
              title="Total Debt"
              value={formatCurrency(totals.debt)}
              change="-2.1%"
              changePositive={true}
              icon={<AlertTriangle className="text-white" />}
              iconColor="bg-gradient-to-r from-yellow-400 to-yellow-600"
            />
            
            <FinancialTile
              title="Net Worth"
              value={formatCurrency(totals.netWorth)}
              change="+15.3%"
              changePositive={true}
              icon={<PiggyBank className="text-white" />}
              iconColor="bg-gradient-to-r from-blue-400 to-cyan-400"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartPlaceholder
              title="Income vs Expenses"
              icon={<TrendingUp />}
              description="Integration ready for Chart.js/Recharts"
            />
            
            <ChartPlaceholder
              title="Expense Categories"
              icon={<PieChart />}
              description="Integration ready for Chart.js/Recharts"
            />
          </div>

          {/* AI Chat Interface */}
          <AIChat />
        </section>

        {/* Financial Data Input Section */}
        <section>
          <div className="holographic-border p-6 rounded-xl glow-effect">
            <h3 className="text-2xl font-bold neon-glow mb-6">Update Financial Information</h3>
            
            <form onSubmit={handleFinancialSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Income Input */}
                <div className="glassmorphism p-6 rounded-xl">
                  <h4 className="text-lg font-semibold mb-4 text-green-400 flex items-center">
                    <DollarSign className="mr-2" />
                    Income Sources
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Salary</label>
                      <HolographicInput
                        type="number"
                        value={financialForm.salary}
                        onChange={(e) => setFinancialForm(prev => ({ ...prev, salary: e.target.value }))}
                        placeholder="Monthly salary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Side Income</label>
                      <HolographicInput
                        type="number"
                        value={financialForm.sideIncome}
                        onChange={(e) => setFinancialForm(prev => ({ ...prev, sideIncome: e.target.value }))}
                        placeholder="Additional income"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Investments</label>
                      <HolographicInput
                        type="number"
                        value={financialForm.investments}
                        onChange={(e) => setFinancialForm(prev => ({ ...prev, investments: e.target.value }))}
                        placeholder="Investment returns"
                      />
                    </div>
                  </div>
                </div>

                {/* Expenses Input */}
                <div className="glassmorphism p-6 rounded-xl">
                  <h4 className="text-lg font-semibold mb-4 text-red-400 flex items-center">
                    <CreditCard className="mr-2" />
                    Monthly Expenses
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Housing</label>
                      <HolographicInput
                        type="number"
                        value={financialForm.housing}
                        onChange={(e) => setFinancialForm(prev => ({ ...prev, housing: e.target.value }))}
                        placeholder="Rent/Mortgage"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Food & Groceries</label>
                      <HolographicInput
                        type="number"
                        value={financialForm.food}
                        onChange={(e) => setFinancialForm(prev => ({ ...prev, food: e.target.value }))}
                        placeholder="Food expenses"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Transportation</label>
                      <HolographicInput
                        type="number"
                        value={financialForm.transportation}
                        onChange={(e) => setFinancialForm(prev => ({ ...prev, transportation: e.target.value }))}
                        placeholder="Transport costs"
                      />
                    </div>
                  </div>
                </div>

                {/* Debts Input */}
                <div className="glassmorphism p-6 rounded-xl">
                  <h4 className="text-lg font-semibold mb-4 text-yellow-400 flex items-center">
                    <AlertTriangle className="mr-2" />
                    Debts & Liabilities
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Credit Cards</label>
                      <HolographicInput
                        type="number"
                        value={financialForm.creditCards}
                        onChange={(e) => setFinancialForm(prev => ({ ...prev, creditCards: e.target.value }))}
                        placeholder="CC debt"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Student Loans</label>
                      <HolographicInput
                        type="number"
                        value={financialForm.studentLoans}
                        onChange={(e) => setFinancialForm(prev => ({ ...prev, studentLoans: e.target.value }))}
                        placeholder="Student debt"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Other Loans</label>
                      <HolographicInput
                        type="number"
                        value={financialForm.otherLoans}
                        onChange={(e) => setFinancialForm(prev => ({ ...prev, otherLoans: e.target.value }))}
                        placeholder="Other debts"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <HolographicButton
                  type="submit"
                  className="px-8 py-3 text-lg"
                  disabled={updateFinancialMutation.isPending}
                >
                  <Save className="mr-2" />
                  {updateFinancialMutation.isPending ? "Updating..." : "Update Financial Data"}
                </HolographicButton>
              </div>
            </form>
          </div>
        </section>

        {/* API Configuration Section */}
        <section>
          <div className="holographic-border p-6 rounded-xl">
            <h3 className="text-2xl font-bold neon-glow mb-6">Backend Configuration</h3>
            
            <form onSubmit={handleConfigSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-cyan-400">API Base URL</label>
                  <HolographicInput
                    type="url"
                    value={apiConfig.baseUrl}
                    onChange={(e) => setApiConfig(prev => ({ ...prev, baseUrl: e.target.value }))}
                    placeholder="https://your-api.com/v1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-cyan-400">API Key</label>
                  <HolographicInput
                    type="password"
                    value={apiConfig.apiKey}
                    onChange={(e) => setApiConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                    placeholder="Enter your API key"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4 text-blue-400">Available Endpoints</h4>
                <div className="space-y-3">
                  <div className="glassmorphism p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-green-400">POST /api/financial-analysis</span>
                      <span className="text-xs text-gray-400">Analyze financial data</span>
                    </div>
                  </div>
                  <div className="glassmorphism p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-blue-400">GET /api/user/dashboard</span>
                      <span className="text-xs text-gray-400">Fetch dashboard data</span>
                    </div>
                  </div>
                  <div className="glassmorphism p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-yellow-400">PUT /api/user/financial-data</span>
                      <span className="text-xs text-gray-400">Update financial information</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <HolographicButton type="button" className="flex items-center">
                  <TestTube className="mr-2" />
                  Test Connection
                </HolographicButton>
                <HolographicButton
                  type="submit"
                  variant="outline"
                  disabled={updateConfigMutation.isPending}
                  className="flex items-center"
                >
                  <Settings className="mr-2" />
                  {updateConfigMutation.isPending ? "Configuring..." : "Configure"}
                </HolographicButton>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}