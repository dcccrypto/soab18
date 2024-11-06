require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const burnRoutes = require('./routes/burns');
const tokenRoutes = require('./routes/tokens');
const { trackNewBurns } = require('./controllers/burnController');
const connectDB = require('./db');
const http = require('http');
const websocketService = require('./services/websocketService');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', burnRoutes);
app.use('/api', tokenRoutes);

// Basic health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'SOBA Backend API' });
});

// Initialize WebSocket service
websocketService.initialize(server);

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
      
      // Set up periodic burn tracking (every hour)
      setInterval(trackNewBurns, 60 * 60 * 1000);
      
      // Initial burn tracking
      trackNewBurns();
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  mongoose.connection.close();
  process.exit(0);
}); 