const { findById } = require("../../models/Appointments");
const Appointments = require("../../models/Appointments");
const Appointment = require("../../models/Appointments");

// get appointment by Id
exports.fetchAppointment = async (appointmentId, next) => {
  try {
    const appointment = await Appointment.findById(appointmentId);
    return appointment;
  } catch (error) {
    next(error);
  }
};

exports.bookAppointment = async (req, res, next) => {
  try {
    req.body.guardian = req.user._id;
    const newAppointment = await Appointment.create({
      guardian: req.user._id.toString(),
      caretaker: req.body._id,
      status: "Pending",
    });
    console.log(req.user._id.toString());
    res.status(201).json(newAppointment);
  } catch (error) {
    next(error);
  }
};

exports.AppointListFetch = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();
    return res.json(appointments);
  } catch (error) {
    next(error);
  }
};

// delete a appointment
exports.appointmentDelete = async (req, res, next) => {
  try {
    await req.appointment.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

//updating appointment
// exports.updateAppointment = async (req, res, next) => {
//   // try {
//     console.log(appointmentId.status);
//     const status = await Appointment.findById(appointmentId.status);
//     const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
//       $set: { status: !status },
//     });
//     return res.status(200).json(appointment);
//   // } catch (error) {
//   //   next(error);
//   // }
// };
