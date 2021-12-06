const express = require("express");
const {
  bookAppointment,
  AppointListFetch,
  appointmentDelete,
  fetchAppointment,
  updateAppointment,
} = require("./appointment.controllers");
const router = express.Router();
const passport = require("passport");
const Appointments = require("../../models/Appointments");

// Param Middleware
router.param("appointmentId", async (req, res, next, appointmentId) => {
  const appointment = await fetchAppointment(appointmentId, next);
  if (appointment) {
    req.appointment = appointment;
    next();
  } else {
    next({ status: 404, message: "appointment unavailable" });
  }
});

router.post(
  "/",
  passport.authenticate("jwtStrategyGuardian", { session: false }),
  bookAppointment
);

router.get("/", AppointListFetch);

router.delete("/:appointmentId", appointmentDelete);

router.put(":/appointmentId", updateAppointment);

module.exports = router;
