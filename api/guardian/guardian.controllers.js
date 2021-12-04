const Guardian = require("../../models/Guardian");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");

const generateToken = (guardian) => {
  const payload = {
    _id: guardian._id,
    username: guardian.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
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
