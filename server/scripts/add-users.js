const config = require('config');
const mongoose = require('mongoose');

const User = require('../models/user');

// Hard-coded user list
const users = [
	{ username: 'Carrie76', password: 'telekinesis' },
	{ username: 'Jack80', password: 'heresjohnny' },
	{ username: 'Pennywise90', password: 'youllfloattoo' },
	{ username: 'Percy99', password: 'drysponge' },
	{ username: 'Wendigo89', password: 'sometimesdeadisbetter' }
];

const addUsers = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI || config.db || 'mongodb://localhost:27017/yadayada', {
			keepAlive: false,
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	} catch (error) {
		console.log(error);
		process.exit();
	}

	await Promise.all(users.map(async user => (
		await new Promise((resolve) => {
			User.findOne({ username: user.username }, (error, model) => {
				if (!model) {
					const newUser = new User({
						username: user.username,
						password: user.password
					});

					newUser.save((err) => {
						if (err) {
							console.log(`User ${user.username} could not be added due to the following error: `, err);
						} else {
							console.log(`User ${user.username} added successfully`);
						}
						resolve();
					});
				} else {
					console.log(`User ${user.username} has already been added`);
					resolve();
				}
			});
		})
	)));

	process.exit();
};

addUsers();
