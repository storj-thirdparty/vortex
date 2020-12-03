const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const ApiError = require('../lib/ApiError.js');
const config = require('../config.json');
const getBucketName = require('../lib/getBucketName.js');

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
		stargateAccessKey: user.stargateAccessKey,
		stargateSecretKey: user.stargateSecretKey,
		stargateBucket: getBucketName(user),
		stargateEndpoint: config.stargateEndpoint,
		activated: user.activated
	};
};
