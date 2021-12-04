const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");

const CareTaker = require("../models/CareTaker");

const { CT_JWT_SECRET } = require("../config/caretakerKeys");

exports.localStrategyCareTaker = new LocalStrategy(
  async (username, password, done) => {
    try {
      const careTaker = await CareTaker.findOne({ username: username });

      const passwordsMatch = careTaker
        ? await bcrypt.compare(password, careTaker.password)
        : false;

      if (passwordsMatch) return done(null, careTaker);
      return done(null, false);
    } catch (error) {
      done(error);
    }
  }
);

exports.jwtStrategyCareTaker = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: CT_JWT_SECRET,
  },
  async (payload, done) => {
    if (Date.now() > payload.exp) {
      return done(null, false);
    }
    try {
      const careTaker = await CareTaker.findById(payload._id);
      return done(null, careTaker);
    } catch (error) {
      done(error);
    }
  }
);
