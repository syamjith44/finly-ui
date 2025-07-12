import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/navbar";
import { FinancialTile } from "@/components/ui/financial-tile";
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
  Edit,
  Save,
  Car,
  Home,
  Utensils,
  GraduationCap,
  Building2,
  Target
} from "lucide-react";
import { FinancialDataWithTotals } from "@/types/financial";

export default function HomePage() {
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

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);

  // Fetch financial data
  const { data: financialData } = useQuery<FinancialDataWithTotals>({
    queryKey: ["/api/financial-data", user?.id],
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

  const handleSaveEdit = () => {
    updateFinancialMutation.mutate(financialForm);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    // Reset form to original data
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
    setIsEditing(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totals = financialData?.totals || { income: 0, expenses: 0, debt: 0, netWorth: 0 };

  // Financial data items with categories
  const financialItems = [
    // Income
    { key: 'salary', label: 'Salary', value: financialForm.salary, category: 'Income', icon: <DollarSign className="text-white" />, color: 'bg-gradient-to-r from-green-400 to-green-600' },
    { key: 'sideIncome', label: 'Side Income', value: financialForm.sideIncome, category: 'Income', icon: <Target className="text-white" />, color: 'bg-gradient-to-r from-green-400 to-green-500' },
    { key: 'investments', label: 'Investments', value: financialForm.investments, category: 'Income', icon: <PiggyBank className="text-white" />, color: 'bg-gradient-to-r from-green-500 to-green-600' },
    
    // Expenses
    { key: 'housing', label: 'Housing', value: financialForm.housing, category: 'Expenses', icon: <Home className="text-white" />, color: 'bg-gradient-to-r from-red-400 to-red-600' },
    { key: 'food', label: 'Food & Groceries', value: financialForm.food, category: 'Expenses', icon: <Utensils className="text-white" />, color: 'bg-gradient-to-r from-red-400 to-red-500' },
    { key: 'transportation', label: 'Transportation', value: financialForm.transportation, category: 'Expenses', icon: <Car className="text-white" />, color: 'bg-gradient-to-r from-red-500 to-red-600' },
    
    // Debts
    { key: 'creditCards', label: 'Credit Cards', value: financialForm.creditCards, category: 'Debt', icon: <CreditCard className="text-white" />, color: 'bg-gradient-to-r from-yellow-400 to-yellow-600' },
    { key: 'studentLoans', label: 'Student Loans', value: financialForm.studentLoans, category: 'Debt', icon: <GraduationCap className="text-white" />, color: 'bg-gradient-to-r from-yellow-400 to-yellow-500' },
    { key: 'otherLoans', label: 'Other Loans', value: financialForm.otherLoans, category: 'Debt', icon: <Building2 className="text-white" />, color: 'bg-gradient-to-r from-yellow-500 to-yellow-600' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* AI Chat Interface - Landing Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold neon-glow mb-2">Welcome to FinanceAI</h2>
            <p className="text-gray-300">Your intelligent financial companion</p>
          </div>

          {/* AI Chat Interface */}
          <AIChat />
        </section>

        {/* Financial Overview Section */}
        <section>
          <div className="holographic-border p-6 rounded-xl glow-effect">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold neon-glow">Financial Overview</h3>
              <div className="flex space-x-2">
                {!isEditing ? (
                  <HolographicButton
                    onClick={() => setIsEditing(true)}
                    className="flex items-center"
                  >
                    <Edit className="mr-2 w-4 h-4" />
                    Edit
                  </HolographicButton>
                ) : (
                  <div className="flex space-x-2">
                    <HolographicButton
                      onClick={handleSaveEdit}
                      disabled={updateFinancialMutation.isPending}
                      className="flex items-center"
                    >
                      <Save className="mr-2 w-4 h-4" />
                      {updateFinancialMutation.isPending ? "Saving..." : "Save"}
                    </HolographicButton>
                    <HolographicButton
                      onClick={handleCancelEdit}
                      variant="outline"
                      className="flex items-center"
                    >
                      Cancel
                    </HolographicButton>
                  </div>
                )}
              </div>
            </div>

            {/* Summary Tiles */}
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

            {/* Individual Financial Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {financialItems.map((item) => (
                <div key={item.key} className="financial-tile p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color}`}>
                      {item.icon}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.category === 'Income' ? 'bg-green-400/20 text-green-400' :
                      item.category === 'Expenses' ? 'bg-red-400/20 text-red-400' :
                      'bg-yellow-400/20 text-yellow-400'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-gray-300 text-sm font-medium mb-2">{item.label}</h4>
                  {isEditing ? (
                    <HolographicInput
                      type="number"
                      value={item.value}
                      onChange={(e) => setFinancialForm(prev => ({ ...prev, [item.key]: e.target.value }))}
                      className="w-full text-lg font-bold"
                    />
                  ) : (
                    <p className="text-lg font-bold text-white">{formatCurrency(parseFloat(item.value))}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}