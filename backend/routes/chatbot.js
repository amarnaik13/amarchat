// backend/routes/chatbot.js
import express from 'express';
import db from '../config/db.js';

const router = express.Router();
const { Chatbot } = db.models;

router.post('/', async (req, res) => {
  try {
    const chatbot = await Chatbot.create(req.body);
    res.json(chatbot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;