const bcrypt = require("bcryptjs");
const { prisma } = require("../lib/prisma.js");
const { validationResult, matchedData } = require("express-validator");

async function getSignup(req, res) {
  res.render("signup", {
    title: "Sign-up",
  });
}
async function postSignup(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("signup", {
      title: "Sign-Up",
      errors: errors.array(),
    });
  }
  const { firstname, lastname, username, password } = matchedData(req);
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: hashedPassword,
    },
  });
  res.redirect("/");
}

module.exports = { getSignup, postSignup };
