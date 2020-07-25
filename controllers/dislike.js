const { DBDislike, isValidDisLike } = require("../models/Dislike");

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

module.exports.getDislikes = getDislikes;
module.exports.addDislikes = addDislikes;
