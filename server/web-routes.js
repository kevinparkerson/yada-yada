const messages = require('./controllers/messages');
const pages = require('./controllers/pages');
const users = require('./controllers/users');

// Expose routes
module.exports = (app, passport, io) => {
	/*
	 * Unprotected endpoints
	 */

	app.get('/', pages.login);
	app.get('/login', pages.login);
	app.get('/logout', users.logout);

	app.post('/login', (req, res, next) => {
		if (req.body && (!req.body.username || !req.body.password)) {
			req.flash('loginMessage', 'Please fill out required fields.');
		}
		next();
	}, passport.authenticate('local', { failureFlash: true, failureRedirect: '/' }), users.signin);

	/**
	 * Protected endpoints
	 */

	app.get('/chat/:channel', users.isLoggedIn, pages.main);
	app.get('/messages/:channelId', users.isLoggedIn, messages.getChannelMessages);
	app.get('/users', users.isLoggedIn, users.getAll);

	app.post('/messages', users.isLoggedIn, (req, res, next) => {
		messages.sendMessage(req, res, next, io);
	});

	/**
	 * Error handling
	 */

	// 500 Error check
	app.use((err, req, res, next) => {
		if (err.message
			&& (err.message.includes('not found') || err.message.includes('Cast to ObjectId failed'))) {
			return next();
		}

		console.log(err.stack);
		res.status(500).render('500', {
			error: err.stack,
			layout: false,
			title: 'Yada Yada 500 error',
		});
	});

	// Assume 404 since no middleware responded
	app.use((req, res) => {
		res.status(404).render('404', {
			error: 'Not found',
			title: 'Yada Yada 404 error',
			url: req.originalUrl
		});
	});
};
