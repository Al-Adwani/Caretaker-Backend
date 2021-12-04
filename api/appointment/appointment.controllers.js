const Appointment = require("../../models/Appointments");

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
