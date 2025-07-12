import { 
  users, 
  financialData, 
  chatMessages, 
  apiConfigs,
  type User, 
  type InsertUser, 
  type FinancialData, 
  type InsertFinancialData,
  type ChatMessage,
  type InsertChatMessage,
  type ApiConfig,
  type InsertApiConfig
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByPhone(phone: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserVerification(id: number, isVerified: boolean): Promise<User | undefined>;
  
  // Financial data operations
  getFinancialData(userId: number): Promise<FinancialData | undefined>;
  upsertFinancialData(userId: number, data: InsertFinancialData): Promise<FinancialData>;
  
  // Chat operations
  getChatMessages(userId: number): Promise<ChatMessage[]>;
  createChatMessage(userId: number, message: InsertChatMessage): Promise<ChatMessage>;
  updateChatResponse(messageId: number, response: string): Promise<ChatMessage | undefined>;
  
  // API config operations
  getApiConfig(userId: number): Promise<ApiConfig | undefined>;
  upsertApiConfig(userId: number, config: InsertApiConfig): Promise<ApiConfig>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private financialData: Map<number, FinancialData>;
  private chatMessages: Map<number, ChatMessage>;
  private apiConfigs: Map<number, ApiConfig>;
  private currentUserId: number;
  private currentFinancialId: number;
  private currentChatId: number;
  private currentConfigId: number;

  constructor() {
    this.users = new Map();
    this.financialData = new Map();
    this.chatMessages = new Map();
    this.apiConfigs = new Map();
    this.currentUserId = 1;
    this.currentFinancialId = 1;
    this.currentChatId = 1;
    this.currentConfigId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByPhone(phone: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.phone === phone);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      id, 
      email: insertUser.email || null,
      phone: insertUser.phone || null,
      isVerified: false, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserVerification(id: number, isVerified: boolean): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      const updatedUser = { ...user, isVerified };
      this.users.set(id, updatedUser);
      return updatedUser;
    }
    return undefined;
  }

  async getFinancialData(userId: number): Promise<FinancialData | undefined> {
    return Array.from(this.financialData.values()).find(data => data.userId === userId);
  }

  async upsertFinancialData(userId: number, data: InsertFinancialData): Promise<FinancialData> {
    const existing = Array.from(this.financialData.values()).find(fd => fd.userId === userId);
    
    if (existing) {
      const updated: FinancialData = {
        ...existing,
        salary: data.salary || null,
        sideIncome: data.sideIncome || null,
        investments: data.investments || null,
        housing: data.housing || null,
        food: data.food || null,
        transportation: data.transportation || null,
        creditCards: data.creditCards || null,
        studentLoans: data.studentLoans || null,
        otherLoans: data.otherLoans || null,
        updatedAt: new Date()
      };
      this.financialData.set(existing.id, updated);
      return updated;
    } else {
      const id = this.currentFinancialId++;
      const newData: FinancialData = {
        id,
        userId,
        salary: data.salary || null,
        sideIncome: data.sideIncome || null,
        investments: data.investments || null,
        housing: data.housing || null,
        food: data.food || null,
        transportation: data.transportation || null,
        creditCards: data.creditCards || null,
        studentLoans: data.studentLoans || null,
        otherLoans: data.otherLoans || null,
        updatedAt: new Date()
      };
      this.financialData.set(id, newData);
      return newData;
    }
  }

  async getChatMessages(userId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.userId === userId)
      .sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0));
  }

  async createChatMessage(userId: number, message: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatId++;
    const chatMessage: ChatMessage = {
      id,
      userId,
      ...message,
      response: null,
      createdAt: new Date()
    };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }

  async updateChatResponse(messageId: number, response: string): Promise<ChatMessage | undefined> {
    const message = this.chatMessages.get(messageId);
    if (message) {
      const updated = { ...message, response };
      this.chatMessages.set(messageId, updated);
      return updated;
    }
    return undefined;
  }

  async getApiConfig(userId: number): Promise<ApiConfig | undefined> {
    return Array.from(this.apiConfigs.values()).find(config => config.userId === userId);
  }

  async upsertApiConfig(userId: number, config: InsertApiConfig): Promise<ApiConfig> {
    const existing = Array.from(this.apiConfigs.values()).find(c => c.userId === userId);
    
    if (existing) {
      const updated: ApiConfig = { 
        ...existing, 
        baseUrl: config.baseUrl || null,
        apiKey: config.apiKey || null,
        isActive: config.isActive || null
      };
      this.apiConfigs.set(existing.id, updated);
      return updated;
    } else {
      const id = this.currentConfigId++;
      const newConfig: ApiConfig = { 
        id, 
        userId, 
        baseUrl: config.baseUrl || null,
        apiKey: config.apiKey || null,
        isActive: config.isActive || null
      };
      this.apiConfigs.set(id, newConfig);
      return newConfig;
    }
  }
}

export const storage = new MemStorage();
