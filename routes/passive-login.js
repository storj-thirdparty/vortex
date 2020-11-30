const User = require('../models/User.js');
const ApiError = require('../lib/ApiError.js');
const config = require('../config.json');

module.exports = async ctx => {
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
		stargateCredentials: user.stargateCredentials || {},
		bucket: user.id.toString(),
		stargateEndpoint: config.stargateEndpoint,
		activated: user.activated
	};
};
