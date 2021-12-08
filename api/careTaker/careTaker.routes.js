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

// REVIEW: paths are allllways lowercase, /signin and /signup

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
  upload.single("image"),
  updateCareTakerProfile
);

router.get("/", CaretakerListFetch);

module.exports = router;
