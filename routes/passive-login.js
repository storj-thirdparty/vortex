const User = require('../models/User.js');
const ApiError = require('../lib/ApiError.js');
const config = require('../config.json');
const getBucketName = require('../lib/getBucketName.js');

module.exports = async ctx => {
	if(typeof ctx.session.userId === 'undefined') {
		throw new ApiError("No login with session.");
	}

	const user = await User.findOne({
		where: {
			id: ctx.session.userId
		}
	});

	if (user === null) {
		throw new ApiError('Session invalid.');
	}

	ctx.body = {
		email: user.email,
		stargateAccessKey: user.stargateAccessKey,
		stargateSecretKey: user.stargateSecretKey,
		stargateBucket: getBucketName(user),
		stargateEndpoint: config.stargateEndpoint,
		activated: user.activated
	};
};
