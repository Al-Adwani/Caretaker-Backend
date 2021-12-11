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
    type: "guardian",
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

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

exports.guardianFetch = async (req, res, next) => {
  try {
    const guardian = await Guardian.find();
    return res.json(guardian);
  } catch (error) {
    next(error);
  }
};

//Get Guardian
exports.GuardianProfile = async (req, res, next) => {
  try {
    await Guardian.findById(req.user);

    res.status(200).json(req.user.profile);
  } catch (error) {
    next(error);
  }
};
// UPDATE PROFILE
exports.updateGuardianProfile = async (req, res, next) => {
  try {
    const profile = { profile: req.body };
    if (req.file) {
      profile.profile.image = `/${req.file.path}`;
      profile.profile.image = profile.profile.image.replace("\\", "/");
    }
    const updated = await Guardian.findByIdAndUpdate(req.user._id, profile, {
      new: true,
    });
    return res.status(201).json(updated);
  } catch (error) {
    return next(error);
  }
};
