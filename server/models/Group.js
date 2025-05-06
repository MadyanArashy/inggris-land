import { DataTypes } from 'sequelize';
import db from "../config/Database.js" // Ensure sequelize is properly configured

const Group = db.define('Group', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Group.associate = (models) => {
  Group.hasMany(models.Completion, {
    foreignKey: "groupId",
    as: "completions",
  });
};

export default Group;
