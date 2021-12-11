const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const {
  CareTakerSignin,
  CareTakerSignup,
  CareTakerProfile,
  updateCareTakerProfile,
  CaretakerListFetch,
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
  "/profile",
  passport.authenticate("jwt", { session: false }),
  upload.single("profile.image"),
  updateCareTakerProfile
);

router.get("/", CaretakerListFetch);

module.exports = router;
