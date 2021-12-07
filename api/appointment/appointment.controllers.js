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

// BOOK APP
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
    const deleteAppointment = await Appointment.findById(
      req.params.appointmentId
    );
    if (deleteAppointment) {
      await deleteAppointment.remove();
      return res.status(204).end();
    } else {
      const ErrorMsg = {
        status: 404,
        message: "appointment not found!",
      };
      next(ErrorMsg);
    }
  } catch (error) {
    next(error);
  }
};

//updating appointment
exports.updateAppointment = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      [{ $set: { status: { $eq: [false, "$status"] } } }],
      { new: true }
    );
    res.json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};
