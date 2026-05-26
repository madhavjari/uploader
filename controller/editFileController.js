const { prisma } = require("../lib/prisma.js");

async function postEditFile(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  const username = req.params.username;
  const folderId = parseInt(req.params.folderid);
  const fileId = parseInt(req.params.id);
  const editedName = req.body.name;
  if (req.user.username !== username) return res.sendStatus(403);
  const nameExists = await prisma.files.findFirst({
    where: { AND: [{ name: editedName }, { id: { not: fileId } }] },
  });
  if (nameExists) return res.redirect(`/${username}/${folderId}`);
  await prisma.files.update({
    where: { id: fileId },
    data: { name: editedName },
  });
  res.redirect(`/${username}/${folderId}`);
}

module.exports = { postEditFile };
