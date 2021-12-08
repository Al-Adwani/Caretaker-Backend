const Guardian = require("../../models/Guardian");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");
const CareTaker = require("../../models/CareTaker");

const generateToken = (guardian) => {
  const payload = {
    _id: guardian._id,
    username: guardian.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

//  REVIEW: functions use camelCase, they always start with a lowercase letter
// Also they're always verbs
// y3ny: guardianSignup, guardianSignin, fetchGuardianProfile
exports.GuardianSignup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;

    const newGuardian = await Guardian.create(req.body);
    const token = generateToken(newGuardian);

    //   await Profile.create({ user: newGuardian._id });

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
exports.GuardianSignin = (req, res, next) => {
  const token = generateToken(req.user);
  res.json({ token });
};
//Get Guardian
exports.GuardianProfile = async (req, res, next) => {
  try {
    await Guardian.findById(req.user);
    // REVIEW: now isn't req.user the actual Guardian? Why find him again?
    res.status(200).json(req.user.profile);
  } catch (error) {
    next(error);
  }
};
// UPDATE PROFILE
exports.updateGuardianProfile = async (req, res, next) => {
  try {
    // REVIEW: Remove console logs
    console.log(req.user.username);
    if (req.file) {
      // REVIEW: This will cause issues with iamges if you're using baseURL in the frontend
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const updated = await Guardian.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};
