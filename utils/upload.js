const { v4: UUIDV4 } = require("uuid");
const multer = require("multer");
const path = require("path");

const config = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../public/uploads"));
  },
  filename: async (req, file, cb) => {
    const fileName =
      (await UUIDV4()) + "-temp" + file.mimetype.replace("video/", ".");
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const isAcceptable = /video\/*/.test(file.mimetype) ? true : false;
  cb(null, isAcceptable);
};

const upload = multer({ storage: config, fileFilter: fileFilter });

module.exports.upload = upload;
