const { DataTypes, Sequelize, db } = require("../utils/db");
const joi = require("joi");

const DBVideo = db.define("video", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  uploadedBy: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  privacy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const isValidVideo = (videoObj) => {
  const schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    category: joi.string().required(),
    privacy: joi.number().required(),
  });

  const { error } = schema.validate(videoObj);

  return error;
};

module.exports.isValidVideo = isValidVideo;
module.exports.DBVideo = DBVideo;
