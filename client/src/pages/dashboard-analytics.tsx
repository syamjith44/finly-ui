import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/navbar";
import { MetricCard } from "@/components/ui/metric-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { DonutChart } from "@/components/ui/donut-chart";
import { LineChart } from "@/components/ui/line-chart";
import { BarChart } from "@/components/ui/bar-chart";
import { useAuth } from "@/hooks/use-auth";
import { 
  DollarSign, 
  CreditCard, 
  AlertTriangle, 
  PiggyBank,
  TrendingUp,
  Target,
  Calendar,
  Activity,
  Wallet,
  TrendingDown
} from "lucide-react";
import { FinancialDataWithTotals } from "@/types/financial";

export default function DashboardAnalytics() {
  const { user } = useAuth();

  // Fetch financial data
  const { data: financialData } = useQuery<FinancialDataWithTotals>({
    queryKey: ["/api/financial-data", user?.id],
    enabled: !!user?.id,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totals = financialData?.totals || { income: 0, expenses: 0, debt: 0, netWorth: 0 };

  // Mock data for charts and analytics
  const monthlyData = [
    { label: 'Jan', value: 5200 },
    { label: 'Feb', value: 4800 },
    { label: 'Mar', value: 5500 },
    { label: 'Apr', value: 6100 },
    { label: 'May', value: 5800 },
    { label: 'Jun', value: 6200 }
  ];

  const expenseBreakdown = [
    { label: 'Housing', value: parseFloat(financialData?.housing || '0'), color: '#ef4444' },
    { label: 'Food', value: parseFloat(financialData?.food || '0'), color: '#f97316' },
    { label: 'Transportation', value: parseFloat(financialData?.transportation || '0'), color: '#eab308' }
  ];

  const incomeBreakdown = [
    { label: 'Salary', value: parseFloat(financialData?.salary || '0'), color: '#22c55e' },
    { label: 'Side Income', value: parseFloat(financialData?.sideIncome || '0'), color: '#10b981' },
    { label: 'Investments', value: parseFloat(financialData?.investments || '0'), color: '#06b6d4' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Dashboard Header */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold neon-glow mb-2">Analytics Dashboard</h2>
            <p className="text-gray-300">Detailed insights into your financial performance</p>
          </div>
        </section>

        {/* Key Metrics */}
        <section>
          <h3 className="text-xl font-semibold mb-6 text-blue-400">Key Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Monthly Income"
              value={formatCurrency(totals.income)}
              change="+12.5%"
              changePositive={true}
              icon={<DollarSign className="text-white" />}
              iconColor="bg-gradient-to-r from-green-400 to-green-600"
              subtitle="vs last month"
            />
            
            <MetricCard
              title="Monthly Expenses"
              value={formatCurrency(totals.expenses)}
              change="+8.2%"
              changePositive={false}
              icon={<CreditCard className="text-white" />}
              iconColor="bg-gradient-to-r from-red-400 to-red-600"
              subtitle="vs last month"
            />
            
            <MetricCard
              title="Savings Rate"
              value="24.3%"
              change="+2.1%"
              changePositive={true}
              icon={<PiggyBank className="text-white" />}
              iconColor="bg-gradient-to-r from-blue-400 to-blue-600"
              subtitle="of income"
            />
            
            <MetricCard
              title="Debt to Income"
              value="18.7%"
              change="-1.5%"
              changePositive={true}
              icon={<AlertTriangle className="text-white" />}
              iconColor="bg-gradient-to-r from-yellow-400 to-yellow-600"
              subtitle="ratio"
            />
          </div>
        </section>

        {/* Financial Goals Progress */}
        <section>
          <h3 className="text-xl font-semibold mb-6 text-blue-400">Financial Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProgressBar
              title="Emergency Fund"
              current={15000}
              target={25000}
              icon={<PiggyBank className="text-white" />}
              color="bg-gradient-to-r from-blue-400 to-blue-600"
            />
            
            <ProgressBar
              title="Vacation Fund"
              current={3200}
              target={8000}
              icon={<Target className="text-white" />}
              color="bg-gradient-to-r from-purple-400 to-purple-600"
            />
            
            <ProgressBar
              title="Debt Payoff"
              current={12000}
              target={20000}
              icon={<TrendingDown className="text-white" />}
              color="bg-gradient-to-r from-green-400 to-green-600"
            />
          </div>
        </section>

        {/* Charts and Analytics */}
        <section>
          <h3 className="text-xl font-semibold mb-6 text-blue-400">Detailed Analytics</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income Trend */}
            <LineChart
              title="Income Trend"
              data={monthlyData}
              color="rgb(34, 197, 94)"
              icon={<TrendingUp />}
            />
            
            {/* Expense Categories */}
            <BarChart
              title="Expense Categories"
              data={expenseBreakdown}
              icon={<Activity />}
            />
            
            {/* Income Sources */}
            <DonutChart
              title="Income Sources"
              data={incomeBreakdown}
              centerValue={formatCurrency(totals.income)}
              centerLabel="Total Income"
            />
            
            {/* Expense Distribution */}
            <DonutChart
              title="Expense Distribution"
              data={expenseBreakdown}
              centerValue={formatCurrency(totals.expenses)}
              centerLabel="Total Expenses"
            />
          </div>
        </section>

        {/* Advanced Metrics */}
        <section>
          <h3 className="text-xl font-semibold mb-6 text-blue-400">Advanced Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Net Worth Growth"
              value="+$2,340"
              change="+15.3%"
              changePositive={true}
              icon={<TrendingUp className="text-white" />}
              iconColor="bg-gradient-to-r from-green-400 to-green-600"
              subtitle="this month"
            />
            
            <MetricCard
              title="Investment Returns"
              value="+8.7%"
              change="+1.2%"
              changePositive={true}
              icon={<Wallet className="text-white" />}
              iconColor="bg-gradient-to-r from-purple-400 to-purple-600"
              subtitle="YTD"
            />
            
            <MetricCard
              title="Budget Variance"
              value="-$127"
              change="-2.4%"
              changePositive={false}
              icon={<Calendar className="text-white" />}
              iconColor="bg-gradient-to-r from-orange-400 to-orange-600"
              subtitle="vs budget"
            />
          </div>
        </section>
      </main>
    </div>
  );
}