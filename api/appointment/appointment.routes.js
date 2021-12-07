const express = require("express");

const {
  fetchAppointment,
  bookAppointment,
  AppointListFetch,
  appointmentDelete,
  updateAppointment,
} = require("./appointment.controllers");
const router = express.Router();
const passport = require("passport");
const Appointment = require("../../models/Appointments");

// Param Middleware
// router.param("appointmentId", async (req, res, next, appointmentId) => {
//   const appointment = await fetchAppointment(req, res, appointmentId, next);
//   if (appointment) {
//     req.appointment = appointment;
//     next();
//   } else {
//     next({ status: 404, message: "appointment unavailable" });
//   }
// });

router.param("appointmentId", async (req, res, next, appointmentId) => {
  const appointment = await fetchAppointment(appointmentId, next);
  if (appointment) {
    req.product = appointment;
    next();
  } else {
    next({ status: 404, message: "Product Not Found!" });
  }
});

router.post(
  "/",
  passport.authenticate("jwtStrategyGuardian", { session: false }),
  bookAppointment
);

router.get("/", AppointListFetch);

router.delete("/:appointmentId", appointmentDelete);

router.put("/:appointmentId", updateAppointment);

module.exports = router;
