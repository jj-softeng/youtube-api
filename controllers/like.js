const { DBLike, isValidLike, isValidToDelete } = require("../models/Like");

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

const dropLike = async (req, res) => {
  const error = isValidToDelete(req.body);
  if (error)
    return res.json({ message: "invalid data!", error: error.message });

  try {
    const deleted = await DBLike.destroy({
      where: {
        ...req.body,
      },
    });

    if (!deleted) return res.json({ message: "failed to delete!" });

    return res.json({ message: "successfully deleted!" });
  } catch (err) {
    return res.json({ message: "unable to delete!", error: err.message });
  }
};

module.exports.dropLike = dropLike;
module.exports.getLikes = getLikes;
module.exports.addLikes = addLikes;
