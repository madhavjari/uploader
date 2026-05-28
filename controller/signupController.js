const bcrypt = require("bcryptjs");
const { prisma } = require("../lib/prisma.js");
const { validationResult, matchedData } = require("express-validator");

function renderSignupErrors(res, errors) {
  return res.status(400).render("signup", {
    title: "Sign-Up",
    errors,
  });
}

async function getSignup(req, res) {
  res.render("signup", {
    title: "Sign-up",
  });
}
async function postSignup(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return renderSignupErrors(res, errors.array());
  }
  const { firstname, lastname, username, password } = matchedData(req);
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUser) {
    return renderSignupErrors(res, [
      { msg: "Username is already taken" },
    ]);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: hashedPassword,
      },
    });
    res.redirect("/");
  } catch (err) {
    if (err.code === "P2002" && err.meta?.target?.includes("username")) {
      return renderSignupErrors(res, [
        { msg: "Username is already taken" },
      ]);
    }
    throw err;
  }
}

module.exports = { getSignup, postSignup };
