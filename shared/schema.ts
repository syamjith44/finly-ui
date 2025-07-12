import { pgTable, text, serial, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email"),
  phone: text("phone"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const financialData = pgTable("financial_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  
  // Income
  salary: decimal("salary", { precision: 10, scale: 2 }).default("0"),
  sideIncome: decimal("side_income", { precision: 10, scale: 2 }).default("0"),
  investments: decimal("investments", { precision: 10, scale: 2 }).default("0"),
  
  // Expenses
  housing: decimal("housing", { precision: 10, scale: 2 }).default("0"),
  food: decimal("food", { precision: 10, scale: 2 }).default("0"),
  transportation: decimal("transportation", { precision: 10, scale: 2 }).default("0"),
  
  // Debts
  creditCards: decimal("credit_cards", { precision: 10, scale: 2 }).default("0"),
  studentLoans: decimal("student_loans", { precision: 10, scale: 2 }).default("0"),
  otherLoans: decimal("other_loans", { precision: 10, scale: 2 }).default("0"),
  
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  message: text("message").notNull(),
  response: text("response"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const apiConfigs = pgTable("api_configs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  baseUrl: text("base_url"),
  apiKey: text("api_key"),
  isActive: boolean("is_active").default(false),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  phone: true,
});

export const insertFinancialDataSchema = createInsertSchema(financialData).omit({
  id: true,
  userId: true,
  updatedAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  message: true,
});

export const insertApiConfigSchema = createInsertSchema(apiConfigs).omit({
  id: true,
  userId: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type FinancialData = typeof financialData.$inferSelect;
export type InsertFinancialData = z.infer<typeof insertFinancialDataSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ApiConfig = typeof apiConfigs.$inferSelect;
export type InsertApiConfig = z.infer<typeof insertApiConfigSchema>;
