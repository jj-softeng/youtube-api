const { Sequelize, DataTypes } = require("sequelize");

const isDev = process.env.NODE_ENV === "development" ? console.log : false;
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: isDev,
});
const checkInfoAndSync = async () => {
  try {
    await sequelize.sync({});
    console.log(`[ SUCCESS ] All Models are synchronized...`);
    await sequelize.authenticate();
    console.log(`[ SUCCESS ] DB is connected...`);
  } catch (err) {
    console.log(`[ ERROR ] Failed to connect with DB...`, err);
  }
};

checkInfoAndSync();

module.exports.db = sequelize;
module.exports.DataTypes = DataTypes;
module.exports.Sequelize = Sequelize;
