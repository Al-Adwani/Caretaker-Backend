const { model, Schema } = require("mongoose");

const AppointmentSchema = Schema(
  {
    guardian: { type: Schema.Types.ObjectId, ref: "Guardian" },
    caretaker: { type: Schema.Types.ObjectId, ref: "Caretaker" },
    status: { type: String, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = model("Appointment", AppointmentSchema);
