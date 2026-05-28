const { Router } = require("express");
const uploadController = require("../controller/uploadController");
const allowedMimeTypes = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only PDF, PNG, JPEG, XLSX, DOCX, and PPTX files are allowed",
        ),
      );
    }
  },
});

const uploadRouter = Router();

function uploadErrorMessage(err) {
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return "File size must be 5 MB or less";
  }
  return err.message || "Unable to upload this file";
}

function handleUpload(req, res, next) {
  upload.single("avatar")(req, res, (err) => {
    if (!err) {
      return next();
    }
    return res.status(400).render("upload", {
      title: "Upload",
      id: req.params.folderid,
      username: req.params.username,
      errors: [{ msg: uploadErrorMessage(err) }],
    });
  });
}

uploadRouter.get("/:username/:folderid/upload", uploadController.getUpload);

uploadRouter.post(
  "/:username/:folderid/upload",
  handleUpload,
  uploadController.postUpload,
);

module.exports = uploadRouter;
