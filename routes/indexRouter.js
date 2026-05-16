const { Router } = require("express");
const indexController = require("../controller/indexController");

const indexRouter = Router();

indexRouter.get("/", indexController.getHomePage);

module.exports = indexRouter;
