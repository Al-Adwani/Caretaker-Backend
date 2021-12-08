const Appointment = require("../../models/Appointments");
const CareTaker = require("../../models/CareTaker");

//Find appointment by Id
exports.fetchAppointment = async (appointmentId, next) => {
  try {
    const FoundAppointment = await Appointment.findById(appointmentId);
    return FoundAppointment;
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
    const deleteAppointment = await Appointment.findById(
      req.params.appointmentId
    ); // we are doing it the old fashion way because route.param doesn't work
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
    const { appointmentId } = req.params; // we are doing it the old fashion way because route.param doesn't work

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      [{ $set: { status: req.body.status } }],
      { new: true }
    );
    res.json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};
