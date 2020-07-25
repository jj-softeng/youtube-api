const router = require("express").Router();
const { upload } = require("./utils/upload");

const { getComments, addComments } = require("./controllers/comments");
const { createUser, login } = require("./controllers/auth");
const { getLikes, addLikes, dropLike } = require("./controllers/like");
const {
  addDislikes,
  getDislikes,
  dropDislike,
} = require("./controllers/dislike");
const {
  addSubscriber,
  getSubscriber,
  dropSubscriber,
} = require("./controllers/subscriber");
const {
  addVideos,
  getVideos,
  getVideo,
  alterVideo,
} = require("./controllers/videos");
const {
  getThumbnails,
  getThumbnail,
  alterThumbnails,
} = require("./controllers/thumbnails");
const { auth } = require("./middlewares/auth");
const {
  getCategory,
  getCategories,
  addCategories,
} = require("./controllers/category");

router.route("/comments/:userId").get(getComments);
router.route("/comments").post(addComments);

router.route("/categories").post(addCategories).get(getCategories);
router.route("/categories/:categoryId").get(getCategory);

router.route("/signup").post(createUser);
router.route("/login").post(login);

router.route("/dislikes").post(addDislikes).delete(dropDislike);
router.route("/dislikes/:videoId").get(getDislikes);

router.route("/likes").post(addLikes).delete(dropLike);
router.route("/likes/:videoId").get(getLikes);

router.route("/subscribe").post(addSubscriber).delete(dropSubscriber);
router.route("/subscribe/:userId").get(getSubscriber);

router.route("/videos").get(getVideos);
router.route("/video/:videoId").get(getVideo);
router.put("/video/:videoId", auth, alterVideo);
router.post("/videos", auth, upload.single("file"), addVideos);

router.route("/thumbnails").get(getThumbnails);
router.route("/thumbnail/:videoId").get(getThumbnail).put(alterThumbnails);

module.exports.routes = router;
