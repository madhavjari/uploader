const { Router } = require("express");
const { postEditFile } = require("../controller/editFileController");

const editFileRouter = Router();

editFileRouter.post("/:username/:folderid/:id/edit", postEditFile);

module.exports = editFileRouter;
