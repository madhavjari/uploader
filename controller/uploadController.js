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

    const fileName = `${Date.now()}-${file.originalname}`;
    await supabase.storage.from("uploader").upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });

    const { data: publicUrlData } = supabase.storage
      .from("uploader")
      .getPublicUrl(fileName);

    await prisma.files.create({
      data: {
        name: file.originalname,
        size: parseInt(file.size / 1024),
        folderId: parseInt(id),
        url: publicUrlData.publicUrl,
        path: fileName,
      },
    });

    res.redirect(`/${username}/${id}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
}

module.exports = { getUpload, postUpload };
