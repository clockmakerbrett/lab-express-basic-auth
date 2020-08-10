const { Router } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const authRouter = Router();

authRouter.get("/sign-up", (req, res, next) => {
  res.render("auth/sign-up");
});

authRouter.post("/sign-up", (req, res, next) => {
  const { name, username, password } = req.body;
  bcrypt
    .hash(password, 8)
    .then((hash) => {
      return User.create({
        name,
        username,
        hashedPw: hash,
      });
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      next(error);
    });
});

authRouter.get("/sign-in", (req, res, next) => {
  res.render("auth/sign-in");
});

authRouter.post("/sign-in", (req, res, next) => {
  const { username, password } = req.body;
  let user;
  User.findOne({ username })
    .then((document) => {
      user = document;
      if (!user) {
        return Promise.reject(new Error("No user with that username"));
      }
      const hashedPw = user.hashedPw;
      return bcrypt.compare(password, hashedPw);
    })
    .then((comparison) => {
      if (comparison) {
        req.session.userId = user._id;
        res.redirect("/");
      } else {
        return Promise.reject(new Error("Incorrect password"));
      }
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = authRouter;
