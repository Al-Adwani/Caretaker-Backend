const { Schema, model } = require("mongoose");

const ProfileCareTakerSchema = Schema(
  {
    Caretaker: {
      type: Schema.Types.ObjectId,
      ref: "CareTaker",
    },
    image: {
      type: String,
      default: "/media/defaultimage.png",
    },
    bio: {
      type: String,
    },
    booked: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
  },
  { timestamps: true }
);

module.exports = model("ProfileCare", ProfileCareTakerSchema);
