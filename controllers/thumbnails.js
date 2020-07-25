const { DBThumbnail, isValidForUpdate } = require("../models/Thumbnail");

const getThumbnail = async (req, res) => {
  try {
    const thumbnail = await DBThumbnail.findOne({
      where: {
        videoId: req.params.videoId,
      },
    });
    if (!thumbnail) return res.json({ message: "No thumnails found!" });

    return res.json(thumbnail);
  } catch (err) {
    return res.json({
      message: "unable to fetch thumbnails",
      error: err.message,
    });
  }
};

const getThumbnails = async (req, res) => {
  try {
    const thumbnails = await DBThumbnail.findAll({});
    if (!thumbnails) return res.json({ message: "No thumbnails found!." });

    return res.json(thumbnails);
  } catch (err) {
    return res.json({
      message: "unable to fetch thumbnails",
      error: err.message,
    });
  }
};

const alterThumbnails = async (req, res) => {
  const error = await isValidForUpdate(req.body);
  if (error)
    return res.json({ message: "invalid data provided", error: error.message });
  try {
    const updated = await DBThumbnail.update(
      { selected: req.body.selected },
      {
        where: {
          videoId: req.params.videoId,
        },
      }
    );

    if (!updated) return res.json({ message: "No thumbnails found!" });

    return res.json({ message: "successfully updated!" });
  } catch (err) {
    return res.json({
      message: "unable to update thumbnails",
      error: err.message,
    });
  }
};

module.exports.alterThumbnails = alterThumbnails;
module.exports.getThumbnail = getThumbnail;
module.exports.getThumbnails = getThumbnails;
