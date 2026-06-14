const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Basic Request Logging Middleware
app.use((req, res, next) => {
  console.log(`[Log] ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  next();
});

// Mount routes
app.use('/api/tasks', require('./routes/taskRoutes'));

// 404 Fallback for unhandled routes
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});