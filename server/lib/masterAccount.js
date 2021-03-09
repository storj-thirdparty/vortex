const AWS = require("aws-sdk");
const config = require("../config.json");

const s3Config = {
	accessKeyId: config.masterAccount.accessKey,
	secretAccessKey: config.masterAccount.secretKey,
	endpoint: config.stargateEndpoint,
	s3ForcePathStyle: true,
	signatureVersion: "v4"
};

console.log({ s3Config });

module.exports = new AWS.S3(s3Config);
