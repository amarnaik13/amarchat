import dotenv from 'dotenv';
dotenv.config(); // Load environment variables first

import express from 'express';
import cors from 'cors';
import sequelize from './backend/config/db.js';
import User from './backend/models/User.js';
import Chatbot from './backend/models/chatbot.js';
import Template from './backend/models/Template.js';
import chatbotRoutes from './backend/routes/chatbot.js';

const app = express();

// CORS Setup - Allow frontend
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Use your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Middleware for JSON parsing

// Debugging: Log database config to ensure environment variables are loaded
console.log("Database Config:", {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? '*****' : 'NOT SET',
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT
});

// Sync database
sequelize.sync({ alter: true })
  .then(() => console.log('✅ Database synced successfully'))
  .catch(err => console.error("❌ Database sync failed:", err));

// Routes
app.get('/', (req, res) => {
  console.log("✅ Root route '/' accessed.");
  res.send('Chatbot Backend Running!');
});

// API Route: Fetch Templates
app.get('/api/templates', async (req, res) => {
  try {
    const templates = await Template.findAll();
    res.json(templates);
  } catch (error) {
    console.error('❌ Error fetching templates:', error);
    res.status(500).json({ error: 'Failed to fetch templates.' });
  }
});


app.use('/api/chatbot', chatbotRoutes);

// Start server
const PORT = process.env.PORT || 5000; // Changed port from 5432 to 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
