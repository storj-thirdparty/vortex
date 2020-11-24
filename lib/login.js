const bcrypt = require('bcrypt');
const User = require('./User.js');
const ApiError = require('./ApiError.js');

module.exports = async function signUp(email, password) {
	const user = await User.findOne({
		email
	});

	const result = await bcrypt.compare(password, user.password);

	if(result !== true) {
		throw new ApiError('Bad username/password.');
	}

	return {
		email: user.email
	};
};
