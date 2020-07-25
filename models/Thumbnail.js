const { DataTypes, Sequelize, db } = require("../utils/db");
const joi = require("joi");

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

const isValidForUpdate = (payload) => {
  const schema = joi.object({
    selected: joi.number().required(),
  });

  const { error } = schema.validate(payload);

  return error;
};

module.exports.isValidForUpdate = isValidForUpdate;
module.exports.DBThumbnail = DBThumbnail;
