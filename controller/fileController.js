const { json } = require("express");
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
  const folderId = req.params.folderid;
  const username = req.params.username;
  const allFiles = await prisma.folder.findMany({
    select: { files: true },
    where: { id: parseInt(folderId) },
  });
  res.render("files", {
    title: folderName.name,
    id: folderId,
    username: username,
    allFiles: allFiles[0].files,
  });
}

module.exports = { getFile };
