const { db, DataTypes, Sequelize } = require("../utils/db");
const joi = require("joi");

const DBCategory = db.define("category", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const isValidCategory = (categoryObj) => {
  const schema = joi.object({
    name: joi.string().required(),
  });

  const { error } = schema.validate(categoryObj);

  return error;
};

module.exports.DBCategory = DBCategory;
module.exports.isValidCategory = isValidCategory;
