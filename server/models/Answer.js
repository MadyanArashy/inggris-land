import { DataTypes } from 'sequelize';
import db from "../config/Database.js"
import Question from './Question.js'; // Import Question model

const Answer = db.define('Answer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  true: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  questionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Question,
      key: 'id',
    },
  },
});

export default Answer;
