# FinanceAI - Personal Finance Management Application

A futuristic fintech application with holographic blue UI effects, AI-powered financial analysis, and comprehensive analytics dashboard. Built with React, TypeScript, and Express.js.

## 🚀 Features

- **AI Chat Interface**: Intelligent financial assistant for personalized advice
- **Financial Overview**: Track income, expenses, and debt with editable tiles
- **Analytics Dashboard**: Comprehensive charts and metrics for financial insights
- **Holographic UI**: Modern dark theme with cyan/blue holographic effects
- **Indian Rupee Support**: Full INR currency formatting and localization
- **Real-time Updates**: Live financial calculations and data synchronization

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **TailwindCSS** with custom holographic theme
- **Shadcn/UI** components
- **TanStack Query** for state management
- **Wouter** for routing
- **Vite** for build tooling

### Backend
- **Node.js** with Express.js
- **Drizzle ORM** with PostgreSQL
- **Neon Database** (serverless PostgreSQL)
- **Session-based Authentication**

## 📋 Prerequisites

Before running the application, ensure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL database** (or use Neon Database)

## 🔧 Installation

### Option 1: Local Development Setup (Complete Guide)

1. **Install Node.js**
   - Download and install Node.js 18+ from [nodejs.org](https://nodejs.org/)
   - Verify installation:
   ```bash
   node --version
   npm --version
   ```

2. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd financeai
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Database Setup (Choose one option)**

   **Option A: Use Neon Database (Easiest - No local setup)**
   - Sign up at [neon.tech](https://neon.tech)
   - Create a new project
   - Copy the connection string
   - Create `.env` file:
   ```env
   DATABASE_URL=postgresql://[user]:[password]@[host]/[database]?sslmode=require
   NODE_ENV=development
   PORT=5000
   ```

   **Option B: Local PostgreSQL Setup**
   - Install PostgreSQL from [postgresql.org](https://postgresql.org/download/)
   - Start PostgreSQL service
   - Create database:
   ```bash
   psql -U postgres
   CREATE DATABASE financeai;
   \q
   ```
   - Create `.env` file:
   ```env
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/financeai
   NODE_ENV=development
   PORT=5000
   ```

   **Option C: Use In-Memory Storage (No Database Required)**
   - The app is configured to use in-memory storage by default
   - No database setup needed - data resets on server restart
   - Create `.env` file:
   ```env
   NODE_ENV=development
   PORT=5000
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to: http://localhost:5000
   - The app should load with the holographic UI

### Option 2: Quick Setup (In-Memory Storage)

If you just want to test the application without database setup:

1. **Install Node.js** (if not already installed)
2. **Clone and install**
   ```bash
   git clone <repository-url>
   cd financeai
   npm install
   ```
3. **Run immediately**
   ```bash
   npm run dev
   ```
4. **Access at**: http://localhost:5000

The app will use in-memory storage and work immediately without any database configuration.

## 🚀 Running the Application

### Development Mode (Local Machine)

1. **Start the development server**
   ```bash
   npm run dev
   ```
   This command:
   - Starts the Express backend server on port 5000
   - Starts the Vite frontend development server
   - Enables hot module replacement for instant updates
   - Serves the entire app from port 5000

2. **Access the application**
   - **Main App**: http://localhost:5000
   - **API Endpoints**: http://localhost:5000/api
   - **Hot Reload**: Changes auto-refresh the browser

3. **Development workflow**
   - Edit files in `client/src/` for frontend changes
   - Edit files in `server/` for backend changes
   - Changes are reflected instantly without restart

### Production Mode

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

### Local Development Tips

- **Keep terminal open**: The dev server needs to stay running
- **Check console**: Watch for any errors or logs
- **Auto-restart**: Server automatically restarts on file changes
- **Port conflicts**: If port 5000 is busy, the app will suggest an alternative

### Stopping the Application

- Press `Ctrl + C` in the terminal to stop the development server

## 📁 Project Structure

```
financeai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   │   ├── layout/     # Navigation and layout
│   │   │   └── ui/         # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and API client
│   │   ├── pages/          # Application pages
│   │   └── types/          # TypeScript type definitions
│   └── index.html
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage layer
│   └── vite.ts            # Vite integration
├── shared/                 # Shared schemas and types
│   └── schema.ts
└── package.json
```

## 🎯 Usage Guide

### 1. Authentication
- The app uses OTP-based authentication
- For development, use OTP: `123456` for any email/phone
- No registration required - users are created automatically

### 2. Home Page (/)
- **AI Chat**: Ask financial questions and get intelligent responses
- **Financial Overview**: View and edit your financial data
- **Summary Tiles**: Quick overview of income, expenses, debt, and net worth
- **Individual Items**: Detailed breakdown of each financial category

### 3. Dashboard (/dashboard)
- **Key Metrics**: Important financial ratios and percentages
- **Financial Goals**: Track progress with visual progress bars
- **Charts & Analytics**: 
  - Income trends over time
  - Expense category breakdowns
  - Income source distribution
  - Advanced financial metrics

### 4. Editing Financial Data
- Click the "Edit" button on the home page
- Modify any financial values in the input fields
- Click "Save" to update your data
- All charts and metrics update automatically

## 🔧 Configuration

### Database Setup

1. **Using Neon Database (Recommended)**
   - Sign up at [neon.tech](https://neon.tech)
   - Create a new project
   - Copy the connection string to your `.env` file

2. **Using Local PostgreSQL**
   ```sql
   CREATE DATABASE financeai;
   ```
   Update the `DATABASE_URL` in your `.env` file

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NODE_ENV` | Environment (development/production) | No |
| `PORT` | Server port (default: 5000) | No |

## 🎨 Customization

### Theme Colors
Edit `client/src/index.css` to modify the holographic color scheme:
```css
:root {
  --primary: 200 100% 70%;      /* Cyan */
  --secondary: 210 100% 70%;    /* Blue */
  --accent: 220 100% 70%;       /* Light Blue */
}
```

### Adding New Analytics Components
The app includes reusable analytics components:
- `ProgressBar`: For goal tracking
- `MetricCard`: For key financial metrics
- `DonutChart`: For category breakdowns
- `LineChart`: For trend analysis
- `BarChart`: For comparisons

## 🐛 Troubleshooting

### Common Local Development Issues

1. **"npm: command not found"**
   - Install Node.js from [nodejs.org](https://nodejs.org/)
   - Restart your terminal after installation

2. **Port Already in Use (EADDRINUSE)**
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F

   # Mac/Linux
   lsof -ti:5000 | xargs kill -9
   
   # Or change port in .env file
   PORT=3000
   ```

3. **Database Connection Errors**
   - **Using Neon**: Check your connection string in `.env`
   - **Using PostgreSQL**: Ensure PostgreSQL service is running
   - **Using in-memory**: Remove `DATABASE_URL` from `.env`

4. **Module Not Found Errors**
   ```bash
   # Clear everything and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

5. **"Cannot GET /" Error**
   - Make sure you're accessing http://localhost:5000 (not just localhost:5000)
   - Check if the development server is running in your terminal

6. **Build Errors**
   ```bash
   # Clear Vite cache
   npm run build -- --force
   
   # Or clear all caches
   rm -rf node_modules/.vite
   npm run dev
   ```

7. **Permission Errors (Mac/Linux)**
   ```bash
   # Fix npm permissions
   sudo chown -R $(whoami) ~/.npm
   ```

### Quick Reset

If everything breaks, try this complete reset:
```bash
# Stop the server (Ctrl+C)
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to email/phone
- `POST /api/auth/verify-otp` - Verify OTP and create session
- `POST /api/auth/logout` - Logout user

### Financial Data
- `GET /api/financial-data/:userId` - Get user's financial data
- `PUT /api/financial-data/:userId` - Update financial data

### Chat
- `GET /api/chat/:userId` - Get chat messages
- `POST /api/chat/:userId` - Send new message

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section above
- Review the code documentation in `replit.md`

## 🔮 Future Enhancements

- Integration with real banking APIs
- Advanced AI financial advisor
- Mobile application
- Multi-currency support
- Investment portfolio tracking
- Bill reminder system

---

Built with ❤️ using modern web technologies