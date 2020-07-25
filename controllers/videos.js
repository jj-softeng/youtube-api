const { DBVideo, isValidVideo } = require("../models/Video");
const { startProcessing } = require("../utils/process");
const {
  ffmpeg: { ffprobe },
} = require("../utils/process");

const { DBThumbnail } = require("../models/Thumbnail");

const addVideos = async (req, res) => {
  if (!req.file) return res.json({ message: "No file provided!." });

  const error = await isValidVideo(req.body);
  if (error)
    return res.json({ message: "Unable to upload file", err: error.message });

  const outputPath = req.file.path.replace(
    /-temp\.[\.\- a-zA-Z0-9]{1,9}$/,
    ".mp4"
  );

  const inputPath = req.file.path;

  const outputFilename = req.file.filename.replace(
    /-temp\.[\.\- a-zA-Z0-9]{1,9}$/,
    ""
  );

  try {
    const error = await startProcessing(inputPath, outputPath, outputFilename);
    if (!error) {
      ffprobe(inputPath, async (err, data) => {
        if (err) return res.json({ message: "unable to upload File!" });

        const { duration } = data.format;

        let hours = Math.floor(duration / 3600);
        let mins = Math.floor((duration - hours * 3600) / 60);
        let secs = Math.floor(duration % 60);

        hours = hours < 1 ? "" : hours + ":";
        mins = mins < 10 ? "0" + mins + ":" : mins + ":";
        secs = secs < 10 ? "0" + secs : secs;

        const customDuration = hours + mins + secs;

        const { title, description, privacy, category } = req.body;

        const video = {
          title,
          description,
          category,
          privacy,
          uploadedBy: req.user,
          filePath: `uploads/${outputFilename}.mp4`,
          duration: customDuration,
        };

        try {
          const videoObj = await DBVideo.create({ ...video });

          if (videoObj) {
            const saveThumb = await DBThumbnail.create({
              filePath: "thumbnails/",
              selected: 1,
              videoId: videoObj.dataValues.id,
            });

            if (saveThumb) {
              return res.json({
                message: "file successfully Uploaded!.",
                payload: videoObj,
              });
            }
          }
        } catch (err) {
          res.json(err.message);
        }

        return res.json({ message: "something went wrong!" });
      });
    }
  } catch (err) {
    res.json({ message: "upload Failed!.", error: err.message });
  }
};

const getVideos = async (req, res) => {
  try {
    const videos = await DBVideo.findAll({});
    if (!videos) return res.json({ message: "No videos found!." });

    return res.json(videos);
  } catch (err) {
    return res.json({ message: "unable to fetch videos", error: err.message });
  }
};

const getVideo = async (req, res) => {
  try {
    const video = await DBVideo.findOne({
      where: {
        id: req.params.videoId,
      },
    });
    if (!video) return res.json({ message: "No video found!" });

    return res.json(video);
  } catch (err) {
    return res.json({ message: "unable to fetch video", error: err.message });
  }
};

const alterVideo = async (req, res) => {
  const error = await isValidVideo(req.body);
  if (error)
    return res.json({ message: "invalid data provided", error: error.message });
  try {
    const updated = await DBVideo.update(
      { ...req.body },
      {
        where: {
          id: req.params.videoId,
        },
      }
    );

    if (!updated) return res.json({ message: "unable to update!" });

    return res.json({ message: "successfully Updated!" });
  } catch (err) {
    res.json({ message: "failed to update!", error: err.message });
  }
};

module.exports.alterVideo = alterVideo;
module.exports.addVideos = addVideos;
module.exports.getVideo = getVideo;
module.exports.getVideos = getVideos;
