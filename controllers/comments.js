const { DBComment, isValidComment } = require("../models/Comment");

const getComments = async (req, res) => {
  try {
    const comments = await DBComment.findAll({
      where: {
        id: req.params.userId,
      },
    });
    if (!comments.length) return res.json({ message: "No comments found" });
    res.json(comments);
  } catch (err) {
    res.json({ message: "failed to fetch comments", err: err.message });
  }
};

const addComments = async (req, res) => {
  const error = await isValidComment(req.body);
  if (error) return res.json(error.message);

  try {
    const comment = await DBComment.create({
      ...req.body,
    });
    res.send(comment);
  } catch (err) {
    return res.json({
      error: "unable to create comment.",
      reason: err.message,
    });
  }
};

module.exports.getComments = getComments;
module.exports.addComments = addComments;
