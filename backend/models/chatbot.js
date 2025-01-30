// backend/models/chatbot.js
import { DataTypes } from 'sequelize';

const Chatbot = (sequelize, DataTypes) => { // <-- Add DataTypes parameter
  return sequelize.define('Chatbot', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    configuration: {
      type: DataTypes.JSON,
      allowNull: false
    }
    // Add other fields
  });
};

export default Chatbot;