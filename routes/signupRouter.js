const { Router } = require("express");
const signupController = require("../controller/signupController");
const { body } = require("express-validator");

const signupRouter = Router();

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 15 characters.";

const validateUser = [
  body("firstname")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 3, max: 15 })
    .withMessage(`First name ${lengthErr}`),
  body("lastname")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 3, max: 15 })
    .withMessage(`Last name ${lengthErr}`),
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage(`Username must be alphanumeric`)
    .isLength({ min: 3, max: 15 })
    .withMessage(`Username ${lengthErr}`),

  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be greater than 8 or less than 20"),
];

signupRouter.get("/sign-up", signupController.getSignup);

signupRouter.post(
  "/sign-up",
  validateUser,
  body("confirmpassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Password does not match"),
  signupController.postSignup,
);

module.exports = signupRouter;
