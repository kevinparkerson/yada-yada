const Message = require('../models/message');
const sockets = require('../web-sockets');

exports.getChannelMessages = (req, res, next) => {
	res.setHeader('content-type', 'application/json');

	const done = function (data, error) {
		if (error) {
			res.status(500);
			res.send({ error, message: data });
		} else {
			res.send({ messages: data });
		}
	};

	if (req.params && req.params.channelId) {
		Message.find({ channelId: req.params.channelId }).sort({ date: 1 }).exec((error, messages) => {
			if (error) {
				done('Internal error occurred', error)
			} else {
				done(messages);
			}
		});
	} else {
		done('No channelId was provided', {});
	}
};

exports.sendMessage = (req, res, next, io) => {
	res.setHeader('content-type', 'application/json');

	// Sanitizing the incoming data is important but it's not done here due to time constraints
	const newMessage = new Message({
		channelId: req.body.channelId,
		date: new Date(),
		senderId: req.user._id,
		senderName: req.user.username,
		value: req.body.value
	});

	newMessage.save((error) => {
		if (error) {
			res.status(500);
			res.send({ error });
		} else {
			const message = newMessage.toJSON();

			// Send a response now so the client can continue
			res.send({ message });

			// Broadcasting out to connected clients so they receive the message
			sockets.broadcastMessage(io, message);

			// Deleting older messages so the amount of data stored doesn't get too crazy
			Message.find({ channelId: message.channelId }).sort({ date: 1 }).exec((err, messages) => {
				if (!err) {
					const exceedsLimit = (message.channelId === 'general' ? 1000 : 500) - messages.length;
					if (exceedsLimit < 0) {
						const messagesToDelete = messages.slice(0, Math.abs(exceedsLimit));
						Message.deleteMany({ '_id': { $in: messagesToDelete } }).exec();
					}
				}
			});
		}
	});
};
