const router = require("express").Router();
const { upload } = require("./utils/upload");

const { getComments, addComments } = require("./controllers/comments");
const { createUser, login } = require("./controllers/auth");
const { addDislikes, getDislikes } = require("./controllers/dislike");
const { getLikes, addLikes } = require("./controllers/like");
const { addSubscriber, getSubscriber } = require("./controllers/subscriber");
const { addVideos } = require("./controllers/videos");
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

router.route("/dislikes").post(addDislikes);
router.route("/dislikes/:videoId").get(getDislikes);

router.route("/likes").post(addLikes);
router.route("/likes/:videoId").get(getLikes);

router.route("/subscribe").post(addSubscriber);
router.route("/subscribe/:userId").get(getSubscriber);

router.post("/videos", auth, upload.single("file"), addVideos);

module.exports.routes = router;
