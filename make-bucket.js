const AWS = require('aws-sdk');
const config = require('./config.json');

const s3Config = {
	accessKeyId: config.masterAccount.accessKey,
	secretAccessKey: config.masterAccount.secretKey,
	endpoint: config.stargateEndpoint,
	s3ForcePathStyle: true,
	signatureVersion: 'v4'
};

(async () => {

	console.log(s3Config);

	const s3 = new AWS.S3(s3Config);

	await s3.createBucket({
		Bucket: "test2"
	}).promise();

})();
