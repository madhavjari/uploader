const { prisma } = require("../lib/prisma.js");

async function getHomePage(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect(`/${req.user.username}`);
  }
  res.render("index", {
    title: "File Uploader",
    user: req.user,
  });
}

module.exports = { getHomePage };
