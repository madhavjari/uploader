const express = require("express");
const app = express();
const passport = require("passport");
const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");
const uploadRouter = require("./routes/uploadRouter");
const folderRouter = require("./routes/folderRouter");
const fileRouter = require("./routes/filesRouter");
const session = require("express-session");
const configurePassport = require("./config/passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { prisma } = require("./lib/prisma.js");

const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

configurePassport();
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });
});

app.use(loginRouter);
app.use(signupRouter);
app.use(indexRouter);
app.use(uploadRouter);
app.use(folderRouter);
app.use(fileRouter);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on port ${PORT}!`);
});
