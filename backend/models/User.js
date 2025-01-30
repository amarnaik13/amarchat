// backend/models/User.js
import { DataTypes } from 'sequelize';

const User = (sequelize, DataTypes) => { // <-- Add DataTypes parameter
  return sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    }
    // ... other fields
  });
};

export default User;