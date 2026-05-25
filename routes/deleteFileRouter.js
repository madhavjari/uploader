const { Router } = require("express");
const { postDeleteFile } = require("../controller/deleteFileController");

const deleteFileRouter = Router();

deleteFileRouter.post("/:username/:folderid/:id/delete", postDeleteFile);

module.exports = deleteFileRouter;
