const { model, Schema } = require("mongoose");

const CareTakerSchema = Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  profile: {
    firstName: {
      type: String,
      default: "Average",
    },
    lastName: {
      type: String,
      default: "Joe",
    },

    image: {
      type: String,
    },

    qualification: {
      type: String,
      default: "i currently have no qualification",
    },
    pastExp: {
      type: String,
      default: " i currently have no experience",
    },

    bio: {
      type: String,
      default: "i'm pretty boring",
    },
    specialty: {
      type: String,
      default: "Nanny or Maid",
    },
  },
  booked: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
});

module.exports = model("CareTaker", CareTakerSchema);
