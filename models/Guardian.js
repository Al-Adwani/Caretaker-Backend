const { model, Schema } = require("mongoose");

const GuardianSchema = Schema({
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

    numberOfKids: {
      type: Number,
    },

    bio: {
      type: String,
    },
  },
});

module.exports = model("Guardian", GuardianSchema);
