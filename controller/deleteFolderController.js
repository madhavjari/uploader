const { prisma } = require("../lib/prisma.js");

async function postDeleteFolder(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  const username = req.params.username;
  const folderId = req.params.id;
  if (req.user.username !== username) return res.sendStatus(403);
  await prisma.folder.delete({
    where: { id: parseInt(folderId) },
  });
  res.redirect(`/${req.params.username}`);
}

module.exports = { postDeleteFolder };
