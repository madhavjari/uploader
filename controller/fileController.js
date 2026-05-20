const { prisma } = require("../lib/prisma.js");

async function getFile(req, res) {
  if (!req.isAuthenticated()) {
    return res.render("login", {
      title: "Log-in",
    });
  }
  const folderName = await prisma.folder.findUnique({
    where: { id: parseInt(req.params.folderid) },
  });
  if (!folderName) {
    return res.status(404).redirect("/");
  }
  res.render("files", {
    title: folderName.name,
  });
}

module.exports = { getFile };
