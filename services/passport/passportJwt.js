const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const config = require('../../config');

const jwtOptions = {
  secretOrKey: config.secretKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User
      .findById(payload.id)
      .populate('roles');

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

passport.use(jwtLogin);
