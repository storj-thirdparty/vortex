const bcrypt = require('bcrypt');
const User = require('./User.js');
const ApiError = require('./ApiError.js');
const config = require('../config.json');

module.exports = async function signUp(email, password) {
	if(typeof email !== 'string' || email.length === 0) {
		throw new ApiError("Please enter an email.");
	}

	if(typeof password !== 'string' || password.length === 0) {
		throw new ApiError("Please enter a password.");
	}

	const user = await User.findOne({
		email
	});

	const result = await bcrypt.compare(password, user !== null ? user.password : '');

	if(result !== true) {
		throw new ApiError('Bad username/password.');
	}

	user.lastLoginTime = Date.now();

	await user.save();

	return {
		email: user.email,
		stargateCredentials: user.stargateCredentials,
		bucket: user.id.toString(),
		stargateEndpoint: config.stargateEndpoint
	};
};
