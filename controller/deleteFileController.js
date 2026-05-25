const { prisma } = require("../lib/prisma.js");

async function postDeleteFile(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  const username = req.params.username;
  const folderId = req.params.folderid;
  const fileId = req.params.id;
  console.log(fileId);
  if (req.user.username !== username) return res.sendStatus(403);
  await prisma.files.delete({
    where: { id: parseInt(fileId) },
  });
  res.redirect(`/${username}/${folderId}`);
}

module.exports = { postDeleteFile };
