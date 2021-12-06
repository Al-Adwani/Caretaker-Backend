const Appointment = require("../../models/Appointments");
const CareTaker = require("../../models/CareTaker");

// get appointment by Id
exports.fetchAppointment = async (appointmentId, next) => {
  try {
    const appointment = await Appointment.findById(appointmentId);
    return appointment;
  } catch (error) {
    next(error);
  }
};
// BOOK APP
exports.bookAppointment = async (req, res, next) => {
  try {
    const cName = await CareTaker.findById(req.body);
    req.body.guardian = req.user._id;
    const newAppointment = await Appointment.create({
      guardian: req.user._id.toString(),
      guardianName: req.user.username,
      caretaker: req.body._id,
      caretakerName: cName.username,
      status: "Pending",
    });
    console.log(req.user._id.toString());
    res.status(201).json(newAppointment);
  } catch (error) {
    next(error);
  }
};
// FETCH LIST
exports.AppointListFetch = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();
    return res.json(appointments);
  } catch (error) {
    next(error);
  }
};

// DELETE
exports.appointmentDelete = async (req, res, next) => {
  try {
    await req.appointment.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

//updating appointment
exports.updateAppointment = async (req, res, next) => {
  const appointment = await Appointment.findByIdAndUpdate(appointmentId.status);

  //  $set:{})}
  // return res.status(200).json(appointment)
  //   // try {
  //     console.log(appointmentId.status);
  //     const status = await Appointment.findById(appointmentId.status);
  //     const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
  //       eq: { status: !status },
  // $eq: { status: !status }
  //     });
  //     return res.status(200).json(appointment);
  //   // } catch (error) {
  //   //   next(error);
  //   // }
};
