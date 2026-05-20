const { Router } = require("express");
const folderController = require("../controller/folderController");

const folderRouter = Router();

folderRouter.get("/:username", folderController.getFolder);

folderRouter.post("/:username", folderController.postFolder);

module.exports = folderRouter;
