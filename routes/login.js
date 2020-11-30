const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const ApiError = require('../lib/ApiError.js');
const config = require('../config.json');

module.exports = async function(ctx) {
	const {email, password} = ctx.request.body;

	if (typeof email !== 'string' || email.length === 0) {
		throw new ApiError('Please enter an email.');
	}

	if (typeof password !== 'string' || password.length === 0) {
		throw new ApiError('Please enter a password.');
	}

	const user = await User.findOne({
		where: { email }
	});

	const result = await bcrypt.compare(password, user !== null ? user.password : '');

	if (result !== true) {
		throw new ApiError('Bad username/password.');
	}

	user.lastLoginTime = Date.now();

	await user.save();

	ctx.session.userId = user.id;

	ctx.body = {
		email: user.email,
		stargateCredentials: {
			accessKey: user.stargateAccessKey,
			secretKey: user.stargateSecretKey
		},
		bucket: 'user' + user.id.toString(),
		stargateEndpoint: config.stargateEndpoint,
		activated: user.activated
	};
};
