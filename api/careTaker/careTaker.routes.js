const express = require("express");
const passport = require("passport");
const {
  CareTakerSignin,
  CareTakerSignup,
  CareTakerProfile,
  updateProfile,
} = require("./careTaker.controllers");
const router = express.Router();

router.post("/Signup", CareTakerSignup);

router.post(
  "/Signin",
  passport.authenticate("local", { session: false }),
  CareTakerSignin
);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  CareTakerProfile
);

router.put(
  "/:caretakerId",
  passport.authenticate("jwt", { session: false }),
  // upload.single("image"),
  updateProfile
);

module.exports = router;
