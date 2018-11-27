const passport = require('passport');

exports.requireLocalAuth = passport.authenticate('local', { session: false });

exports.requireJwtAuth = passport.authenticate('jwt', { session: false });
