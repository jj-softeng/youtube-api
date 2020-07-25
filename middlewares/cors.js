const cors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS,POST,GET,DELETE,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");

  next();
};

module.exports.cors = cors;
