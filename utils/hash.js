const crypto = require("crypto");

const createHash = (string) => {
  return crypto.createHash("sha256").update(string, "utf8").digest("hex");
};

module.exports.createHash = createHash;
