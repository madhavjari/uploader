const { prisma } = require("../lib/prisma.js");

async function getFolder(req, res) {
  if (!req.isAuthenticated()) {
    return res.render("login", {
      title: "Log-in",
    });
  }
  res.render("folder", {
    title: "Folder",
    error: undefined,
  });
}

async function postFolder(req, res) {
  const folderName = await req.body.folder;
  const folderExist = await prisma.folder.findUnique({
    where: {
      name: folderName,
    },
  });
  if (folderExist) {
    res.status(400).render("folder", {
      title: "Folder",
      error: "Folder name already exists",
    });
  } else {
    await prisma.folder.create({
      data: {
        name: folderName,
      },
    });
    res.redirect("/folder");
  }
}

module.exports = { getFolder, postFolder };
