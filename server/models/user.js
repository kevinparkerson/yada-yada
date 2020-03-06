const crypto = require('crypto');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * User Schema
 */

const UserSchema = new Schema({
	username: { type: String, default: '' },
	hashed_password: { type: String, default: '' },
	salt: { type: String, default: '' }
}, {
	toJSON: {
		// Formatting id and removing sensitive information before return to client
		transform: function (doc, ret) {
			ret.id = ret._id;
			delete ret._id;

			delete ret.__v;	// version key
			delete ret.hashed_password;
			delete ret.salt;
		}
	}
});

/**
 * Virtuals
 */

UserSchema
	.virtual('password')
	.set(function (password) {
		this._password = password;
		this.salt = this.makeSalt();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function () { return this._password });

/**
 * Methods
 */

UserSchema.methods = {

	// Authenticate - check if the passwords are the same
	authenticate: function (plainText) {
		return this.encryptPassword(plainText) === this.hashed_password;
	},

	//Make salt - a random key to sprinkle on a password for the secret when encrypting
	makeSalt: function () {
		return `${Math.round(new Date().valueOf() * Math.random())}`;
	},

	// Encrypt password
	encryptPassword: function (password) {
		if (!password) return '';
		try {
			return crypto
				.createHmac('sha1', this.salt)
				.update(password)
				.digest('hex');
		} catch (err) {
			return '';
		}
	}
};

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
