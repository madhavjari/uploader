const { prisma } = require("../lib/prisma.js");

async function getHomePage(req, res) {
  if (req.isAuthenticated()) {
    return res.render("index", {
      title: "File Uploader",
      user: req.user,
    });
  }
  res.render("index", {
    title: "File Uploader",
    user: req.user,
  });
}

module.exports = { getHomePage };
