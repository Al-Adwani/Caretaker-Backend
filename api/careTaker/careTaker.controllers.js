const CareTaker = require("../../models/CareTaker");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  CT_JWT_SECRET,
  CT_JWT_EXPIRATION_MS,
} = require("../../config/caretakerKeys");

const generateToken = (caretaker) => {
  const payload = {
    _id: caretaker._id,
    username: caretaker.username,
    exp: Date.now() + CT_JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(payload, CT_JWT_SECRET);
  return token;
};
// SIGN UP
exports.CareTakerSignup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;

    const newCareTaker = await CareTaker.create(req.body);
    const token = generateToken(newCareTaker);

    //   await Profile.create({ user: newGuardian._id });

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
// SIGN IN
exports.CareTakerSignin = (req, res, next) => {
  const token = generateToken(req.user);
  res.json({ token });
};

//Get CareTakerProfile
exports.CareTakerProfile = async (req, res, next) => {
  try {
    await CareTaker.findById(req.user);
    res.status(200).json(req.user.profile);
  } catch (error) {
    next(error);
  }
};
// FETCH CARETAKER LIST
exports.CaretakerListFetch = async (req, res, next) => {
  try {
    const taker = await CareTaker.find();
    return res.json(taker);
  } catch (error) {
    next(error);
  }
};

// Editing Profile
exports.updateCareTakerProfile = async (req, res, next) => {
  try {
    
    if (req.file) {
      req.body["profile.image"] = `/${req.file.path}`;
      req.body["profile.image"] = req.body["profile.image"].replace("\\", "/");
    }

    const updated = await CareTaker.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    }); // req.user is retrieved from the jwt-strategy, we used it to update the req.body

    return res.status(201).json(updated);
  } catch (error) {
    return next(error);
  }
};
