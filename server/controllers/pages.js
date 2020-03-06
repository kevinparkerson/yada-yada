exports.login = (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect('/chat/general');
		return;
	}

	res.render('login', {
		layout: false,
		message: req.flash('loginMessage'),
		title: 'Yada Yada | Login',
		prod: process.env.NODE_ENV !== 'development'
	});
};

exports.main = (req, res) => {
	res.render( 'main', {
		layout: false,
		user: req.user,
		title: `Yada Yada | ${req.user.username}`,
		prod: process.env.NODE_ENV !== 'development'
	});
};
