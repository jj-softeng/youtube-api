const jwt = require("jsonwebtoken");

const generateToken = async (payload) => {
  const user = payload.dataValues;

  user.password = undefined;

  const token = await jwt.sign(user, process.env.JWT_KEY);

  return token;
};

module.exports.generateToken = generateToken;
