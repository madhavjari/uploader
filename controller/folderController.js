const { prisma } = require("../lib/prisma.js");

async function getFolder(req, res) {
  if (!req.isAuthenticated()) {
    return res.render("login", {
      title: "Log-in",
    });
  }
  const allFolders = await prisma.folder.findMany({
    select: { name: true, id: true },
  });
  res.render("folder", {
    title: "Folder",
    error: undefined,
    folderName: allFolders,
    username: req.user.username,
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
    const allFolders = await prisma.folder.findMany({
      select: { name: true, id: true },
    });
    res.status(400).render("folder", {
      title: "Folder",
      error: "Folder name already exists",
      folderName: allFolders,
      username: req.user.username,
    });
  } else {
    await prisma.folder.create({
      data: {
        name: folderName,
      },
    });
    res.redirect(`/${req.user.username}`);
  }
}

module.exports = { getFolder, postFolder };
