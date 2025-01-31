import express from 'express';
import Chatbot from '../models/chatbot.js';

const router = express.Router();

// POST route for creating a chatbot
router.post('/', async (req, res) => {
  try {
    const { name, template, settings } = req.body;
    const newChatbot = await Chatbot.create({ name, template, settings });
    res.status(201).json(newChatbot);
  } catch (error) {
    console.error('❌ Error creating chatbot:', error);
    res.status(500).json({ error: 'Failed to create chatbot.' });
  }
});

export default router;
