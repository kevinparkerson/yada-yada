const User = require('../models/user');

exports.getAll = function (req, res, next) {
	res.setHeader('content-type', 'application/json');

	User.find({}, (error, users) => {
		if (error) {
			res.status(500);
			res.send({ error });
		} else {
			res.send({
				users: users.map((user) => user.toJSON())
			});
		}
	});
};

exports.isLoggedIn = (req, res, next) => {
	// Continue if the user is authenticated in the session
	if (req.isAuthenticated()) return next();

	// Redirect to the login screen otherwise
	res.redirect('/');
};

exports.logout = (req, res) => {
	req.session.destroy();
	req.logOut();
	setTimeout(() => {
		res.redirect('/');
	}, 1000);
};

exports.signin = (req, res) => {
	res.redirect('/chat/general');
};
