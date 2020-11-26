const crypto = require('crypto');
const postmark = require('postmark');
const config = require('../config.json');
const redis = require('./redis.js');

const postmarkClient = new postmark.Client(config.postmarkToken);

module.exports = async function(user) {
	const activationToken = crypto.randomBytes(32).toString('hex');

	await redis.set(`activation:${activationToken}`, user.id, 'EX', 20 * 60);

	const activationUrl = `${config.baseUrl}/?activation=${activationToken}`;

	postmarkClient.sendEmail({
		"From": "shawn@storj.io",
		"To": user.email,
		"Subject": "Activate your account",
		"TextBody": `Activate your account using the link below. <a href='${activationUrl}'>${activationUrl}</a>`
	});

	user.lastEmailTime = Date.now();

	await user.save();
}
