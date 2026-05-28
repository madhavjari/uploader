const { prisma } = require("../lib/prisma.js");
const supabase = require("../config/supabase");

async function postDeleteFile(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  const username = req.params.username;
  const folderId = req.params.folderid;
  const fileId = parseInt(req.params.id);
  if (req.user.username !== username) return res.sendStatus(403);

  const file = await prisma.files.findUnique({
    where: { id: fileId },
  });

  if (!file) {
    return res.status(404).send("File not found");
  }

  const { error } = await supabase.storage.from("uploader").remove([file.path]);

  if (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
  await prisma.files.delete({
    where: { id: fileId },
  });
  res.redirect(`/${username}/${folderId}`);
}

module.exports = { postDeleteFile };
