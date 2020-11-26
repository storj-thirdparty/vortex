const mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	email: {
		type: String,
		unique: true
	},
	password: String,
	createTime: Date,
	lastLoginTime: Date,
	activated: Boolean,
	stargateCredentials: Object,
	lastEmailTime: Date
});
