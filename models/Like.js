const { DataTypes, Sequelize, db } = require("../utils/db");
const joi = require("joi");

const DBLike = db.define("like", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  commentId: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  videoId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

const isValidLike = (likeObj) => {
  const schema = joi.object({
    username: joi.string().required(),
    commentId: joi.string(),
    videoId: joi.string().required(),
  });

  const { error } = schema.validate(likeObj);

  return error;
};

const isValidToDelete = (likeObj) => {
  const schema = joi.object({
    commentId: joi.any(),
    videoId: joi.string().required(),
  });

  const { error } = schema.validate(likeObj);

  return error;
};

module.exports.isValidToDelete = isValidToDelete;
module.exports.isValidLike = isValidLike;
module.exports.DBLike = DBLike;
