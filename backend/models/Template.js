// backend/models/Template.js
import { DataTypes } from 'sequelize';

const Template = (sequelize, DataTypes) => {
  return sequelize.define('Template', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
    // Add other fields as needed
  });
};

export default Template;  // <-- Must have this line