const { model, Schema } = require("mongoose");

const CareTakerSchema = Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  profile: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },

    image: {
      type: String,
    },

    qualification: {
      type: String,
    },
    pastExp: {
      type: String,
    },

    bio: {
      type: String,
    },
    specialty: {
      type: String,
    },
  },
  booked: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
});

module.exports = model("CareTaker", CareTakerSchema);
