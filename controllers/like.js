const { DBLike, isValidLike } = require("../models/Like");

const getLikes = async (req, res) => {
  try {
    const Likes = await DBLike.findAll({
      where: {
        videoId: req.params.videoId,
      },
    });
    res.json(Likes);
  } catch (err) {
    return res.json({ message: "Unable to fetch Like", error: err.message });
  }
};
const addLikes = async (req, res) => {
  const error = await isValidLike(req.body);
  if (error) return res.json(error.message);

  try {
    const Likes = await DBLike.create({
      ...req.body,
    });
    return res.json(Likes);
  } catch (err) {
    return res.json({ message: "Unable to add Like", error: err.message });
  }
};

module.exports.getLikes = getLikes;
module.exports.addLikes = addLikes;
