const { prisma } = require("../lib/prisma.js");

async function postEditFile(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  const username = req.params.username;
  const folderId = req.params.folderid;
  const fileId = req.params.id;
  const editedName = req.body.name;
  if (req.user.username !== username) return res.sendStatus(403);
  await prisma.files.update({
    where: { id: parseInt(fileId) },
    data: { name: editedName },
  });
  res.redirect(`/${username}/${folderId}`);
}

module.exports = { postEditFile };
