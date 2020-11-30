const bcrypt = require('bcrypt');
const postmark = require('postmark');
const User = require('./User.js');
const ApiError = require('./ApiError.js');
const masterAccount = require('./masterAccount.js');
const generateAccess = require('./generateAccess.js');
const getStargateCredentials = require('./getStargateCredentials.js');
const sendActivationEmail = require('./sendActivationEmail.js');

module.exports = async function signUp(email, password, termsAndConditions) {
	const re = /\S+@\S+\.\S+/;

	if (!re.test(email)) {
		throw new ApiError('Not a valid email address.');
	}

	if (email.length > 100) {
		throw new ApiError('Email too long.');
	}

	if (password.length < 8) {
		throw new ApiError('Password must be at least 8 characters.');
	}

	if (password.length > 100) {
		throw new ApiError('Password too long.');
	}

	if (termsAndConditions !== true) {
		throw new ApiError('Please accept the terms and conditions.');
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
	} catch {
		throw new ApiError('Email already exists.');
	}

	const bucket = newUser.id.toString();

	const bucketParameters = {
		Bucket: bucket
	};

	console.log({newUser, bucketParams: bucketParameters});

	await masterAccount.createBucket(bucketParameters).promise();

	const access = await generateAccess([bucket]);
	console.log({access});

	const credentials = await getStargateCredentials(access);
	console.log({credentials});

	newUser.stargateCredentials = credentials;

	await sendActivationEmail(newUser);

	await newUser.save();
};
