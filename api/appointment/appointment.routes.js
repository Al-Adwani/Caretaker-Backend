const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  fetchAppointment,
  bookAppointment,
  AppointListFetch,
  appointmentDelete,
  updateAppointment,
} = require("./appointment.controllers");

// Param Middleware (param middleware isn't working)
router.param("appointmentId", async (req, res, next, appointmentId) => {
  const appointment = await fetchAppointment(appointmentId, next);
  if (appointment) {
    req.appointment = appointment;
    next();
  } else {
    next({ status: 404, message: "appointment Not Found!" });
  }
});

// Creating Appointment
router.post(
  "/",
  passport.authenticate("jwtStrategyGuardian", { session: false }),
  bookAppointment
);

// Appointment list
router.get("/", AppointListFetch);

// Delete list
router.delete("/:appointmentId", appointmentDelete);

// Update list
router.put("/:appointmentId", updateAppointment);

// testing purposes
router.get("/:appointmentId", fetchAppointment);

module.exports = router;
