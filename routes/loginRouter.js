const { Router } = require("express");
const loginController = require("../controller/loginController");

const loginRouter = Router();

loginRouter.get("/login", loginController.getLogin);

loginRouter.post("/login", loginController.postLogin);

module.exports = loginRouter;
