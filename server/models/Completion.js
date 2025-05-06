import { DataTypes } from 'sequelize';
import db from "../config/Database.js" // Ensure sequelize is properly configured
import User from './User.js'; // Assuming you have a User model
import Group from './Group.js';

const Completion = db.define('Completion', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  groupId: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'id',
    },
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

export default Completion;
