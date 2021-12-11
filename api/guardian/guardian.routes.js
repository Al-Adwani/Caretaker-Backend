const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");

const {
  GuardianSignin,
  GuardianSignup,
  GuardianProfile,
  updateGuardianProfile,
  guardianFetch,
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
  "/profile",
  passport.authenticate("jwtStrategyGuardian", { session: false }),
  upload.single("image"),
  updateGuardianProfile
);

router.get("/", guardianFetch);

module.exports = router;
