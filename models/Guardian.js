const { model, Schema } = require("mongoose");

const GuardianSchema = Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = model("Guardian", GuardianSchema);
