const express = require("express");
const { bookAppointment } = require("./appointment.controllers");
const router = express.Router();
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("jwtStrategyGuardian", { session: false }),
  bookAppointment
);

module.exports = router;
