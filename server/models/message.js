const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Message Schema
 */

const MessageSchema = new Schema({
	channelId: { type: String, default: '' },
	date: { type: Date },
	senderId: { type: String, default: '' },
	senderName: { type: String, default: '' },
	value: { type: String, default: '' }
}, {
	toJSON: {
		// Removing sensitive information and adding convenience data for the client
		transform: function (doc, ret) {
			ret.id = ret._id;
			delete ret._id;

			if (ret.channelId !== 'general') {
				let receiverId = ret.channelId.split('-');
				receiverId = (ret.senderId === receiverId[0]) ? receiverId[1] : receiverId[0];
				ret.receiverId = receiverId;
			}

			delete ret.__v;	// version key
			delete ret.hashed_password;
			delete ret.salt;
		}
	}
});

mongoose.model('Message', MessageSchema);

module.exports = mongoose.model('Message');
