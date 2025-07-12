export interface FinancialTotals {
  income: number;
  expenses: number;
  debt: number;
  netWorth: number;
}

export interface FinancialDataWithTotals {
  salary: string;
  sideIncome: string;
  investments: string;
  housing: string;
  food: string;
  transportation: string;
  creditCards: string;
  studentLoans: string;
  otherLoans: string;
  totals: FinancialTotals;
}

export interface ChatMessage {
  id: number;
  message: string;
  response?: string;
  createdAt: Date;
  isUser: boolean;
}
