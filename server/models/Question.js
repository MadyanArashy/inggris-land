import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import Group from './Group.js'; // Import Group model

const Question = db.define('Question', {
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  groupId: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'id',
    },
  },
});

export default Question;