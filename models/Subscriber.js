const { DataTypes, Sequelize, db } = require("../utils/db");
const joi = require("joi");

const DBSubscriber = db.define("subscriber", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  userTo: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userFrom: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

const isValidSubscriber = (subObj) => {
  const schema = joi.object({
    userTo: joi.string().required(),
    userFrom: joi.string().required(),
  });

  const { error } = schema.validate(subObj);

  return error;
};

module.exports.DBSubscriber = DBSubscriber;
module.exports.isValidSubscriber = isValidSubscriber;
