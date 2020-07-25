const jsonwebtoken = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authToken = req.get("Authorization");

  if (!authToken)
    return res.status(400).json({ message: "No Auth Token Provided!" });

  try {
    const isValid = await jsonwebtoken.verify(authToken, process.env.JWT_KEY);

    if (!isValid)
      return res.status(400).json({ message: "Invalid Auth Token!" });

    if (isValid) {
      req.user = isValid.id;
      next();
    }
  } catch (err) {
    res.json({ message: "Invalid Auth Token!" });
  }
};

module.exports.auth = auth;
