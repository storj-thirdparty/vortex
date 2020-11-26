const User = require('./User.js');
const config = require('../config.json');
const redis = require('./redis.js');
const ApiError = require('./ApiError.js');

module.exports = async function(token) {
	const id = await redis.get(`activation:${token}`);

	console.log({ id });

	await redis.del(`activation:${token}`);

	const user = await User.findOne({
		_id: id
	});

	console.log({ user });

	if(user === null) {
		throw new ApiError('Token not valid.');
	}

	user.activated = true;

	await user.save();

	return user;
}
