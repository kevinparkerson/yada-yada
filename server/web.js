// Lib dependencies
const bodyParser = require('body-parser');
const compression = require('compression');
const config = require('config');
const cookieParser = require('cookie-parser');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const expressSession = require('express-session');
const expressSocketIOSession = require('express-socket.io-session');
const flash = require('connect-flash');
const helpers = require('view-helpers');
const http = require('http');
const mongoose = require('mongoose');
const passport = require('passport');
const serveFavicon = require('serve-favicon');
const socketIO = require('socket.io');
const MongoStore = require('connect-mongo')(expressSession);

// Local dependencies
const passportLocal = require('./utils/passport-local');
const routes = require('./web-routes');
const sockets = require('./web-sockets');

// Env variables
const env = process.env.NODE_ENV || 'development';
const pkg = require('../package.json');
const port = process.env.PORT || config.port || 5555;
const serverId = process.env.DYNO || 'server-1';

// Create the Express server
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Connect to mongodb
const connect = () => {
	mongoose.connect(config.db, {
		keepAlive: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// // Models (if there were a lot more, I'd dynamically load all files within the models directory instead)
// require('./models/message'); // Message model / schema
// require('./models/user'); // User model / schema

// Loading User mongodb models
const User = require('./models/user');

/*
 * Passport settings
 */

passport.serializeUser((user, done) => {
	done(null, { id: user._id, username: user.username });
});

passport.deserializeUser((user, done) => {
	User.findOne({ username: user.username }, (err, foundUser) => {
		if (!err) done(null, foundUser);
		else done(err, null);
	});
});

passport.use(passportLocal);

/*
 * Express settings
 */

// Webpack for client development
if (process.env.NODE_ENV === 'development') {
	const webpack = require('webpack');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');

	const webpackDevConfig = require('../webpack-dev.config');
	const compiler = webpack(webpackDevConfig);

	app.use(webpackDevMiddleware(compiler, {
		publicPath: webpackDevConfig.output.publicPath,
		stats: 'minimal'
	}));

	app.use(webpackHotMiddleware(compiler));
}

// Compression middleware (must be placed before express.static)
app.use(compression({
	threshold: 512
}));

// Set views path, template engine, and default layout
const hbs = expressHandlebars.create({
	defaultLayout: 'login',
	extname: '.html',
	layoutsDir: __dirname + '/views'
});
app.set('views', __dirname + '/views');
app.engine('.html', hbs.engine);
app.set('view engine', '.html');

// Expose env and pkg to server views
app.use((req, res, next) => {
	res.locals.env = env;
	res.locals.pkg = pkg;
	next();
});

// Favicon
app.use(serveFavicon(__dirname + config.favicon));

// Static files middleware
if (env === 'development') {
	app.use('/node_modules', express.static(__dirname + config.nodeModules));
}
app.use(express.static(__dirname + config.buildDir));

// bodyParser middleware for json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cookieParser middleware
app.use(cookieParser());

// Session settings
const session = expressSession({
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	secret: pkg.name
});
app.use(session);

// Sharing the session with socket.io
io.use(expressSocketIOSession(session));

// Use passport session
app.use(passport.initialize());
app.use(passport.session());

// Enables flash msg, which allows putting small nuggets of data like "login errors" in the user session
app.use(flash());

// Provides helper methods to views - must be declared after flash and session
app.use(helpers(pkg.name));

/*
 * Routes
 */

routes(app, passport, io);

/*
 * Sockets
 */

sockets.listen(io);

/*
 * Starting Express server
 */
server.listen(port, () => {
	console.log('Server "' + serverId + '" started on port ' + port);
});
