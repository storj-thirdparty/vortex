const bcrypt = require('bcrypt');
const User = require('./User.js');
const ApiError = require('./ApiError.js');
const masterAccount = require('./masterAccount.js');

module.exports = async function signUp(email, password, termsAndConditions) {
	const re = /\S+@\S+\.\S+/;

	if(!re.test(email)) {
		throw new ApiError("Not a valid email address.");
	}

	if(email.length > 100) {
		throw new ApiError("Email too long.");
	}

	if(password.length < 8) {
		throw new ApiError("Password must be at least 8 characters.");
	}

	if(password.length > 100) {
		throw new ApiError("Password too long.");
	}

	if(termsAndConditions !== true) {
		throw new ApiError("Please accept the terms and conditions.");
	}

	const newUser = new User({
		email,
		password: await bcrypt.hash(password, 10),
		createTime: Date.now(),
		lastLoginTime: Date.now(),
		activated: false
	});

	try {
		await newUser.save();
	} catch(err) {
		throw new ApiError('Email already exists.');
	}

	const bucketParams = {
		Bucket: newUser.id.toString()
	};

	console.log({ newUser, bucketParams });

	await masterAccount.createBucket(bucketParams).promise();
	console.log('made bucket');
};
