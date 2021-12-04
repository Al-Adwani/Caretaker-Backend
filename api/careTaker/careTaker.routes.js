const express = require("express");
const passport = require("passport");
const { CareTakerSignin, CareTakerSignup } = require("./careTaker.controllers");
const router = express.Router();

router.post("/Signup", CareTakerSignup);

router.post(
  "/Signin",
  passport.authenticate("local", { session: false }),
  CareTakerSignin
);

module.exports = router;
