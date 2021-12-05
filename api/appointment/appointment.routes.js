const express = require("express");
const {
  bookAppointment,
  AppointListFetch,
} = require("./appointment.controllers");
const router = express.Router();
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("jwtStrategyGuardian", { session: false }),
  bookAppointment
);

router.get("/", AppointListFetch);

module.exports = router;
