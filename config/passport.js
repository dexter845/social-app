const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { default: mongoose } = require('mongoose');
const keys = require('./keys');
const Users = mongoose.model('users');
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done ) => {
    Users.findOne({ email: jwt_payload.email }, function(err, user) {
      if (err) {
        return done(err, false);
    }
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
    })
  }));
}
