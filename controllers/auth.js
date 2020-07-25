const { DBUser, isValidUser, isValidAuth } = require("../models/User");
const { generateToken } = require("../utils/token");
const { createHash } = require("../utils/hash");

const createUser = async (req, res) => {
  const error = await isValidUser(req.body);
  if (error) return res.json(error.message);

  const password = await createHash(req.body.password);

  try {
    const user = await DBUser.create({
      ...req.body,
      password: password,
    });

    const token = await generateToken(user);

    res.json({ token, user });
  } catch (err) {
    res.json({ message: "user already exists", error: err.message });
  }
};

const login = async (req, res) => {
  const error = await isValidAuth(req.body);
  if (error) return res.json(error.message);

  try {
    const { email, password } = req.body;
    const hashPassword = await createHash(password);
    console.log(hashPassword);
    const user = await DBUser.findOne({
      where: {
        email,
        password: hashPassword,
      },
    });

    !user && res.json({ message: "invalid email or password!" });

    res.json({ token: await generateToken(user), user });
  } catch (err) {
    res.json({ message: "invalid email or password.", error: err.message });
  }
};

module.exports.login = login;
module.exports.createUser = createUser;
