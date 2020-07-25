const {
  DBDislike,
  isValidDisLike,
  isValidToDelete,
} = require("../models/Dislike");

const getDislikes = async (req, res) => {
  try {
    const dislikes = await DBDislike.findAll({
      where: {
        videoId: req.params.videoId,
      },
    });
    res.json(dislikes);
  } catch (err) {
    return res.json({ message: "Unable to fetch Dislike", error: err.message });
  }
};
const addDislikes = async (req, res) => {
  const error = await isValidDisLike(req.body);
  if (error) return res.json(error.message);

  try {
    const dislikes = await DBDislike.create({
      ...req.body,
    });
    return res.json(dislikes);
  } catch (err) {
    return res.json({ message: "Unable to add Dislike", error: err.message });
  }
};

const dropDislike = async (req, res) => {
  const error = isValidToDelete(req.body);
  if (error)
    return res.json({ message: "invalid data!", error: error.message });

  try {
    const deleted = await DBDislike.destroy({
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

module.exports.dropDislike = dropDislike;
module.exports.getDislikes = getDislikes;
module.exports.addDislikes = addDislikes;
