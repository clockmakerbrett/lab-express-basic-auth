const { Router } = require("express");
const router = Router();
const routeGuard = require("../middleware/route-guard");

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/main", (req, res, next) => {
  res.render("main");
});

router.get("/private", routeGuard, (req, res, next) => {
  res.render("private");
});

module.exports = router;
