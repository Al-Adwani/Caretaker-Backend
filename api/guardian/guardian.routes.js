const express = require("express");
const passport = require("passport");
const { GuardianSignin, GuardianSignup } = require("./guardian.controllers");
const router = express.Router();

router.post("/Signup", GuardianSignup);

router.post(
  "/Signin",
  passport.authenticate("localStrategyGuardian", { session: false }),
  GuardianSignin
);

module.exports = router;
