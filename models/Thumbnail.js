const { DataTypes, Sequelize, db } = require("../utils/db");

const DBThumbnail = db.define("thumbnail", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  selected: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  videoId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports.DBThumbnail = DBThumbnail;
