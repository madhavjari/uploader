const { Router } = require("express");
const folderController = require("../controller/folderController");

const folderRouter = Router();

folderRouter.get("/folder", folderController.getFolder);

folderRouter.post("/folder", folderController.postFolder);

module.exports = folderRouter;
