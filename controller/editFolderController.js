const { prisma } = require("../lib/prisma.js");

async function postEditFolder(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  const username = req.params.username;
  const folderId = parseInt(req.params.id);
  const editedName = req.body.name;
  const nameExists = await prisma.folder.findFirst({
    where: { AND: [{ name: editedName }, { id: { not: folderId } }] },
  });
  if (req.user.username !== username) return res.sendStatus(403);
  if (nameExists) return res.redirect(`/${req.params.username}`);
  await prisma.folder.update({
    where: { id: folderId },
    data: { name: editedName },
  });
  res.redirect(`/${req.params.username}`);
}

module.exports = { postEditFolder };
