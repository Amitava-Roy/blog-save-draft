const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authController = require("../controllers/authController");

const setDraftStatus = (req, res, next) => {
  if (req.body) req.body.status = "draft";
  next();
};

const setPublishStatus = (req, res, next) => {
  if (req.body) req.body.status = "published";
  next();
};

router.post(
  "/save-draft",
  authController.protect,
  setDraftStatus,
  blogController.publishOrDraftBlog
);
router.post(
  "/publish",
  authController.protect,
  setPublishStatus,
  blogController.publishOrDraftBlog
);
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);

module.exports = router;
