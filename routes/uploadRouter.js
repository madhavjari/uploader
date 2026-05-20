const { Router } = require("express");
const uploadController = require("../controller/uploadController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const uploadRouter = Router();

uploadRouter.get("/:username/:folderid/upload", uploadController.getUpload);

uploadRouter.post(
  "/upload",
  upload.single("avatar"),
  uploadController.postUpload,
);

module.exports = uploadRouter;
