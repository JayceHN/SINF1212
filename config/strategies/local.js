var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
User = require('mongoose').model('User');
module.exports = function() {
  passport.use(new LocalStrategy({
    usernameField: 'pseudo', //Définir où passeport cherche ses infos dans le modèle mongoose
    passwordField: 'password'
  },
function(pseudo, password, done) {
    User.findOne({pseudo: pseudo
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Unknown user'
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'Invalid password'
        });
      }
      return done(null, user);
    });
  }));
};
