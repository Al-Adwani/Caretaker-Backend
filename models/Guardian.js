const { model, Schema } = require("mongoose");

const GuardianSchema = Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  profile: {
    firstName: {
      type: String,
      // required: true,
      default: "Average",
    },
    lastName: {
      type: String,
      // required: true,
      default: "Moe",
    },

    image: {
      type: String,
    },

    numberOfKids: {
      type: Number,
      default: "i current have 0 kids",
    },

    bio: {
      type: String,
      default: "i'm still thinking",
    },
  },
});

module.exports = model("Guardian", GuardianSchema);
