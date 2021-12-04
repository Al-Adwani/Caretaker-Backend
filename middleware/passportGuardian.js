const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");

const Guardian = require("../models/Guardian");

const { JWT_SECRET } = require("../config/keys");

exports.localStrategyGuardian = new LocalStrategy(async (username, password, done) => {
  try {
    const guardian = await Guardian.findOne({ username: username });

    const passwordsMatch = guardian
      ? await bcrypt.compare(password, guardian.password)
      : false;

    if (passwordsMatch) return done(null, guardian);
    return done(null, false);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategyGuardian = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (payload, done) => {
    if (Date.now() > payload.exp) {
      return done(null, false);
    }
    try {
      const guardian = await Guardian.findById(payload._id);
      return done(null, guardian);
    } catch (error) {
      done(error);
    }
  }
);
