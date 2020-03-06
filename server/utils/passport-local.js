const LocalStrategy = require('passport-local').Strategy;

// User model / schema
const User = require('../models/user');

module.exports = new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	(req, username, password, done) => {
		User.findOne({ 'username': username }, (err, user) => {
			// If there are any errors, return the error before anything else
			if (err) {
				return done(err);
			}

			// If the user isn't found or the password is wrong return a message
			if (!user || !user.authenticate(password)) {
				return done(null, false, req.flash('loginMessage', 'Incorrect username or password.'));
			}

			// All is well, return successful user
			return done(null, user);
		});
	}
);
