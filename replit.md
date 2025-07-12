# FinanceAI - Personal Finance Management Application

## Overview

FinanceAI is a full-stack personal finance management application that combines financial data tracking with AI-powered chat assistance. The application features a modern holographic UI design with real-time financial analytics and intelligent financial advice through an integrated chat system.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2025)

- Restructured dashboard with AI chat as the landing page
- Merged analytics and dashboard into single tab
- Removed backend configuration from UI
- Changed financial data to individual tiles with category tags (Income, Expenses, Debt)
- Implemented edit mode for financial data (edit button toggles editable state)
- Individual financial items now display as tiles with icons and category tags
- Removed separate sections for income sources, monthly expenses, and debts & liabilities

## System Architecture

This is a monorepo application using a client-server architecture with the following structure:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS with custom holographic theme and Shadcn/UI components
- **State Management**: TanStack Query for server state, React Context for authentication
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite with hot module replacement and development optimizations

### Backend Architecture
- **Runtime**: Node.js with Express.js REST API
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL store
- **API Structure**: RESTful endpoints with proper error handling and logging

## Key Components

### Database Schema
The application uses four main tables:
- **users**: Authentication and user profiles (email/phone with OTP verification)
- **financial_data**: Income, expenses, and debt tracking with decimal precision
- **chat_messages**: AI chat conversation history
- **api_configs**: User-specific AI API configurations

### Authentication System
- OTP-based authentication supporting both email and phone
- JWT-less session management using server-side storage
- Mock OTP system for development (always accepts "123456")

### Financial Data Management
- Comprehensive income tracking (salary, side income, investments)
- Expense categorization (housing, food, transportation)
- Debt management (credit cards, student loans, other loans)
- Real-time calculation of financial totals and net worth

### AI Chat Integration
- Configurable AI API endpoints for financial advice
- Message history persistence
- Real-time chat interface with holographic styling

### UI/UX Design
- Custom holographic theme with cyan/blue color palette
- Responsive design with mobile-first approach
- Component library based on Radix UI primitives
- Custom holographic input and button components

## Data Flow

1. **Authentication Flow**: User enters email/phone → OTP sent → OTP verification → Session creation
2. **Financial Data Flow**: User inputs financial data → Form validation → Database persistence → Real-time UI updates
3. **Chat Flow**: User sends message → API configuration check → AI service call → Response storage and display
4. **Dashboard Flow**: User data aggregation → Financial calculations → Chart data preparation → UI rendering

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (PostgreSQL-compatible serverless database)
- **UI Components**: Radix UI primitives for accessible components
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: TanStack Query for server state synchronization

### Development Dependencies
- **Build Tools**: Vite for frontend bundling, ESBuild for backend bundling
- **Type Safety**: TypeScript with strict configuration
- **Database Migrations**: Drizzle Kit for schema management
- **Development Experience**: Replit-specific plugins for error handling and cartography

### AI Integration
- Configurable AI service endpoints (user-provided API keys)
- Support for custom base URLs and API configurations
- Extensible architecture for multiple AI providers

## Deployment Strategy

### Development
- Vite dev server with HMR for frontend development
- Express server with tsx for TypeScript execution
- Shared schema validation between client and server
- Environment-based configuration with DATABASE_URL

### Production
- Frontend: Static build output served by Express
- Backend: Bundled Node.js application using ESBuild
- Database: Serverless PostgreSQL with connection pooling
- Environment: Production optimized with proper error handling

### File Structure
```
├── client/          # React frontend application
├── server/          # Express backend application  
├── shared/          # Shared TypeScript schemas and types
├── migrations/      # Database migration files
└── dist/           # Production build output
```

The application follows a domain-driven design with clear separation of concerns between authentication, financial data management, and AI chat functionality. The codebase emphasizes type safety, developer experience, and maintainable architecture patterns.