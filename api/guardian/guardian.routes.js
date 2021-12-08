const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");

const {
  GuardianSignin,
  GuardianSignup,
  GuardianProfile,
  updateGuardianProfile,
} = require("./guardian.controllers");
const router = express.Router();

// REVIEW: paths are allllways lowercase, /signin and /signup

router.post("/Signup", GuardianSignup);

router.post(
  "/Signin",
  passport.authenticate("localStrategyGuardian", { session: false }),
  GuardianSignin
);

router.get(
  "/profile",
  passport.authenticate("jwtStrategyGuardian", { session: false }),
  GuardianProfile
);

router.put(
  "/profile",
  passport.authenticate("jwtStrategyGuardian", { session: false }),
  upload.single("image"),
  updateGuardianProfile
);

module.exports = router;
