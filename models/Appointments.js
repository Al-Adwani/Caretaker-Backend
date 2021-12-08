const { model, Schema } = require("mongoose");

// REVIEW: File should be called Appointment, single
const AppointmentSchema = Schema(
  {
    // REVIEW: Why do you need guardianName and caretakerName? They can be found in the reference
    guardian: { type: Schema.Types.ObjectId, ref: "Guardian" },
    guardianName: { type: String },
    caretaker: { type: Schema.Types.ObjectId, ref: "Caretaker" },
    caretakerName: { type: String },
    status: { type: String, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = model("Appointment", AppointmentSchema);
