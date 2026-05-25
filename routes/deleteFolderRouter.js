const { Router } = require("express");
const { postDeleteFolder } = require("../controller/deleteFolderController");

const deleteFolderRouter = Router();

deleteFolderRouter.post("/:username/:id/delete", postDeleteFolder);

module.exports = deleteFolderRouter;
