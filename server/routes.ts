import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertFinancialDataSchema, insertChatMessageSchema, insertApiConfigSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Auth routes
  app.post("/api/auth/send-otp", async (req, res) => {
    try {
      const { contact } = req.body;
      
      // Validate input
      const isEmail = contact.includes("@");
      const userData = isEmail ? { email: contact } : { phone: contact };
      
      const validatedData = insertUserSchema.parse(userData);
      
      // Check if user exists
      let user = isEmail 
        ? await storage.getUserByEmail(contact)
        : await storage.getUserByPhone(contact);
      
      if (!user) {
        user = await storage.createUser(validatedData);
      }
      
      // In real implementation, send actual OTP
      // For now, return success with mock OTP
      res.json({ 
        success: true, 
        message: "OTP sent successfully",
        userId: user.id,
        // Mock OTP for development
        otp: "123456"
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  app.post("/api/auth/verify-otp", async (req, res) => {
    try {
      const { userId, otp } = req.body;
      
      // In real implementation, verify actual OTP
      // For now, accept any 6-digit code
      if (otp && otp.length === 6) {
        const user = await storage.updateUserVerification(userId, true);
        if (user) {
          // In real app, set up session/JWT here
          res.json({ success: true, user });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } else {
        res.status(400).json({ message: "Invalid OTP" });
      }
    } catch (error) {
      res.status(400).json({ message: "Verification failed" });
    }
  });

  // Financial data routes
  app.get("/api/financial-data/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const data = await storage.getFinancialData(userId);
      
      if (data) {
        // Calculate totals
        const totalIncome = parseFloat(data.salary || "0") + 
                           parseFloat(data.sideIncome || "0") + 
                           parseFloat(data.investments || "0");
        
        const totalExpenses = parseFloat(data.housing || "0") + 
                             parseFloat(data.food || "0") + 
                             parseFloat(data.transportation || "0");
        
        const totalDebt = parseFloat(data.creditCards || "0") + 
                         parseFloat(data.studentLoans || "0") + 
                         parseFloat(data.otherLoans || "0");
        
        const netWorth = totalIncome - totalExpenses - totalDebt;
        
        res.json({
          ...data,
          totals: {
            income: totalIncome,
            expenses: totalExpenses,
            debt: totalDebt,
            netWorth: netWorth
          }
        });
      } else {
        // Return default empty financial data
        res.json({
          salary: "0", sideIncome: "0", investments: "0",
          housing: "0", food: "0", transportation: "0",
          creditCards: "0", studentLoans: "0", otherLoans: "0",
          totals: { income: 0, expenses: 0, debt: 0, netWorth: 0 }
        });
      }
    } catch (error) {
      res.status(400).json({ message: "Failed to fetch financial data" });
    }
  });

  app.put("/api/financial-data/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const validatedData = insertFinancialDataSchema.parse(req.body);
      
      const updated = await storage.upsertFinancialData(userId, validatedData);
      res.json({ success: true, data: updated });
    } catch (error) {
      res.status(400).json({ message: "Failed to update financial data" });
    }
  });

  // Chat routes
  app.get("/api/chat/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const messages = await storage.getChatMessages(userId);
      res.json(messages);
    } catch (error) {
      res.status(400).json({ message: "Failed to fetch chat messages" });
    }
  });

  app.post("/api/chat/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const validatedMessage = insertChatMessageSchema.parse(req.body);
      
      const message = await storage.createChatMessage(userId, validatedMessage);
      
      // Mock AI response generation
      const mockResponse = generateMockAIResponse(validatedMessage.message);
      await storage.updateChatResponse(message.id, mockResponse);
      
      res.json({ success: true, message: { ...message, response: mockResponse } });
    } catch (error) {
      res.status(400).json({ message: "Failed to send message" });
    }
  });

  // API config routes
  app.get("/api/config/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const config = await storage.getApiConfig(userId);
      res.json(config || { baseUrl: "", apiKey: "", isActive: false });
    } catch (error) {
      res.status(400).json({ message: "Failed to fetch API config" });
    }
  });

  app.put("/api/config/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const validatedConfig = insertApiConfigSchema.parse(req.body);
      
      const config = await storage.upsertApiConfig(userId, validatedConfig);
      res.json({ success: true, config });
    } catch (error) {
      res.status(400).json({ message: "Failed to update API config" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function generateMockAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('income') || lowerMessage.includes('salary') || lowerMessage.includes('earn')) {
    return "Great! I can help you analyze your income streams. Based on what you've shared, I recommend diversifying your income sources and setting aside 20% for savings and investments.";
  }
  
  if (lowerMessage.includes('debt') || lowerMessage.includes('loan') || lowerMessage.includes('credit')) {
    return "I understand you're dealing with debt. The key is to prioritize high-interest debt first (like credit cards) while making minimum payments on others. Consider the debt avalanche or snowball method.";
  }
  
  if (lowerMessage.includes('expense') || lowerMessage.includes('spend') || lowerMessage.includes('cost')) {
    return "Let's work on optimizing your expenses. I suggest following the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings. Track your spending patterns to identify areas for improvement.";
  }
  
  if (lowerMessage.includes('invest') || lowerMessage.includes('save') || lowerMessage.includes('retirement')) {
    return "Investing is crucial for long-term wealth building. Start with an emergency fund (3-6 months of expenses), then consider low-cost index funds or ETFs. Time in the market beats timing the market!";
  }
  
  return "Thank you for sharing your financial information. I'm analyzing your data to provide personalized recommendations. Feel free to ask specific questions about budgeting, saving, investing, or debt management.";
}
