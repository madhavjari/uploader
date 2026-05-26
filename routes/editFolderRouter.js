const { Router } = require("express");
const { postEditFolder } = require("../controller/editFolderController");

const editFolderRouter = Router();

editFolderRouter.post("/:username/:id/update", postEditFolder);

module.exports = editFolderRouter;
