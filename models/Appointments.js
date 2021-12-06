const { model, Schema } = require("mongoose");

const AppointmentSchema = Schema(
  {
    guardian: { type: Schema.Types.ObjectId, ref: "Guardian" },
    guardianName:{type: String},
    caretaker: { type: Schema.Types.ObjectId, ref: "Caretaker" },
    caretakerName:{type: String},
    status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Appointment", AppointmentSchema);
