const path = require("path");

const ffmpegPath = path.join(__dirname, "./ffmpeg");
const ffprobePath = path.join(__dirname, "./ffprobe");

module.exports.ffmpeg_path = ffmpegPath;
module.exports.ffprobe_path = ffprobePath;
