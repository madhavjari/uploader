const { prisma } = require("../lib/prisma.js");

async function getUpload(req, res) {
  if (!req.isAuthenticated()) {
    return res.render("login", {
      title: "Log-in",
    });
  }
  const username = req.params.username;
  const id = req.params.folderid;
  res.render("upload", {
    title: "Upload",
    id: id,
    username: username,
  });
}

async function postUpload(req, res) {
  const file = req.file;
  const username = req.params.username;
  const id = req.params.folderid;
  const folderName = await prisma.folder.findUnique({
    where: { id: parseInt(req.params.folderid) },
  });

  await prisma.files.create({
    data: {
      name: file.originalname,
      size: parseInt(file.size / 1024),
      folderId: parseInt(id),
    },
  });
}

module.exports = { getUpload, postUpload };
