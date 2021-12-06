const express = require("express");
const passport = require("passport");
const {
  GuardianSignin,
  GuardianSignup,
  GuardianProfile,
  updateGuardianProfile,
} = require("./guardian.controllers");
const router = express.Router();

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
  "/",
  passport.authenticate("jwtStrategyGuardian", { session: false }),
  // upload.single("image"),
  updateGuardianProfile
);

module.exports = router;
