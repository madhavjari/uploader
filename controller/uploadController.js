const { prisma } = require("../lib/prisma.js");
const supabase = require("../config/supabase");

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
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded");
    }
    const username = req.params.username;
    const id = req.params.folderid;
    await prisma.folder.findUnique({
      where: { id: parseInt(req.params.folderid) },
    });

    await prisma.files.create({
      data: {
        name: file.originalname,
        size: parseInt(file.size / 1024),
        folderId: parseInt(id),
      },
    });
    const { data, error } = await supabase.storage
      .from("uploader")
      .upload(file.originalname, file.buffer, {
        contentType: file.mimetype,
      });

    console.log("UPLOAD DATA:", data);
    console.log("UPLOAD ERROR:", error);

    res.redirect(`/${username}/${id}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
}

module.exports = { getUpload, postUpload };
