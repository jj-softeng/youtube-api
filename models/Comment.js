const { DataTypes, Sequelize, db } = require("../utils/db");
const joi = require("joi");

const DBComment = db.define("comment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  postedBy: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  videoId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  responseTo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const isValidComment = (commentObj) => {
  const schema = joi.object({
    postedBy: joi.string().required(),
    videoId: joi.string().required(),
    responseTo: joi.number().required(),
    body: joi.string().required(),
  });

  const { error } = schema.validate(commentObj);

  return error;
};

module.exports.DBComment = DBComment;
module.exports.isValidComment = isValidComment;
