const { Schema, model } = require("mongoose");

const ProfileGuardianSchema = Schema(
  {
    Guardian: {
      type: Schema.Types.ObjectId,
      ref: "Guardian",
    },
    image: {
      type: String,
      default: "/media/defaultimage.png",
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("ProfileGuard", ProfileGuardianSchema);
