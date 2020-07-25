const Progress = require("cli-progress");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");

const { ffmpeg_path, ffprobe_path } = require("../FFMPEG/path");

ffmpeg.setFfmpegPath(ffmpeg_path);
ffmpeg.setFfprobePath(ffprobe_path);

const startProcessing = async (inputPath, outputPath, filename) => {
  let bar;
  await ffmpeg(inputPath)
    .output(outputPath)
    .on("error", () => {
      return true;
    })
    .on("start", () => {
      bar = new Progress.SingleBar({}, Progress.Presets.shades_classic);
      bar.start(100, 0, {
        speed: "N/A",
      });
    })
    .on("progress", (progress) => {
      let currentProgress = progress.percent.toFixed(0);
      bar.increment();
      bar.update(currentProgress);
    })
    .on("end", () => {
      bar.update(100);
      bar.stop();
      fs.unlink(inputPath, (err) => {
        if (!err) {
          ffmpeg(outputPath)
            .on("end", () => {
              console.log("thumbnails Generated");
            })
            .thumbnails({
              filename: `${filename}-%i.png`,
              count: 3,
              folder: path.resolve(__dirname, "../public/thumbnails"),
              size: "210x118",
            });

          return false;
        }
        return true;
      });
    })
    .run();
};

module.exports.ffmpeg = ffmpeg;
module.exports.startProcessing = startProcessing;
