async function getUpload(req, res) {
  if (!req.isAuthenticated()) {
    return res.render("login", {
      title: "Log-in",
    });
  }
  res.render("upload", {
    title: "Upload",
  });
}

async function postUpload(req, res) {
  const file = req.file;
  res.redirect("/");
}

module.exports = { getUpload, postUpload };
