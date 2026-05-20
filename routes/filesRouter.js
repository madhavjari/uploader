const { Router } = require("express");

const fileController = require("../controller/fileController");

const fileRouter = Router();

fileRouter.get("/:username/:folderid", fileController.getFile);

module.exports = fileRouter;
