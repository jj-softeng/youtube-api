const { DataTypes, Sequelize, db } = require("../utils/db");
const joi = require("joi");

const DBDislike = db.define("dislike", {
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
    type: DataTypes.UUID,
    defaultValue: null,
  },
  videoId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

const isValidDislike = (dislikeObj) => {
  const schema = joi.object({
    username: joi.string().required(),
    commentId: joi.string(),
    videoId: joi.string().required(),
  });

  const { error } = schema.validate(dislikeObj);

  return error;
};

module.exports.isValidDisLike = isValidDislike;
module.exports.DBDislike = DBDislike;
