const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const ApiError = require("../lib/ApiError.js");
const masterAccount = require("../lib/masterAccount.js");
const generateAccess = require("../lib/generateAccess.js");
const getStargateCredentials = require("../lib/getStargateCredentials.js");
const sendActivationEmail = require("../lib/sendActivationEmail.js");
const getBucketName = require("../lib/getBucketName.js");
const config = require("../config.json");

module.exports = async function (ctx, next) {
	const { email, password, termsAndConditions } = ctx.request.body;

	const re = /\S+@\S+\.\S+/;

	if (!re.test(email)) {
		throw new ApiError("Not a valid email address.");
	}

	if (email.length > 100) {
		throw new ApiError("Email too long.");
	}

	if (!password) {
		throw new ApiError("Not a valid password.");
	}

	if (password.length < 8) {
		throw new ApiError("Password must be at least 8 characters.");
	}

	if (password.length > 100) {
		throw new ApiError("Password too long.");
	}

	if (termsAndConditions !== true) {
		throw new ApiError("Please accept the terms and conditions.");
	}

	const newUser = User.build({
		email,
		password: await bcrypt.hash(password, 10),
		createTime: Date.now(),
		lastLoginTime: Date.now(),
		activated: false,
		planId: "free-1g"
	});

	try {
		await newUser.save();
	} catch (err) {
		throw new ApiError("Email already exists.");
	}

	const bucket = getBucketName(newUser);

	const bucketParameters = {
		Bucket: bucket
	};

	try {
		console.log({ newUser, bucketParams: bucketParameters });

		await masterAccount.createBucket(bucketParameters).promise();

		const access = await generateAccess([bucket]);
		console.log({ access });

		const { accessKey, secretKey } = await getStargateCredentials(access);

		newUser.stargateAccessKey = accessKey;
		newUser.stargateSecretKey = secretKey;
	} catch (err) {
		console.log("Connection to stargate failed", err);

		throw new ApiError("Connection to Stargate failed.");
	}

	if (config.features.emailActivation === true) {
		await sendActivationEmail(newUser);
	}

	await newUser.save();

	await next();
};
