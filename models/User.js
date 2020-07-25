const { DataTypes, Sequelize, db } = require("../utils/db");
const joi = require("joi");

const DBUser = db.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profilePic: {
    type: DataTypes.STRING,
  },
});

const isValidUser = (userObj) => {
  const schema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    username: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    profilePic: joi.string(),
  });

  const { error } = schema.validate(userObj);

  return error;
};

const isValidAuth = (userObj) => {
  const schema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
  });

  const { error } = schema.validate(userObj);

  return error;
};

module.exports.DBUser = DBUser;
module.exports.isValidUser = isValidUser;
module.exports.isValidAuth = isValidAuth;
