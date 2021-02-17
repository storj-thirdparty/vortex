/* global Go, WebAssembly */
const fs = require("fs");
const config = require("../config");

const go = new Go();

const wasmInit = WebAssembly.instantiate(fs.readFileSync(`${__dirname}/access.wasm`), go.importObject);

wasmInit.then(result => {
	go.run(result.instance);
});

module.exports = async function (buckets = []) {
	await wasmInit;

	const permission = await global.newPermission();

	if (permission.error) {
		throw new Error(permission.error);
	}

	permission.value.AllowDownload = true;
	permission.value.AllowUpload = true;
	permission.value.AllowDelete = true;
	permission.value.AllowList = true;

	console.log(permission);

	const apiKeyPermissionParameters = [
		config.masterAccount.apiKey,
		buckets,
		permission.value
	];

	console.log({apiKeyPermissionParams: apiKeyPermissionParameters});

	const restricted = await global.setAPIKeyPermission(...apiKeyPermissionParameters);

	if (restricted.error) {
		throw new Error(restricted.error);
	}

	const accessGrantParameters = [
		config.masterAccount.satelliteUrl,
		restricted.value,
		config.masterAccount.passphrase,
		config.masterAccount.projectId
	];

	console.log({accessGrantParams: accessGrantParameters});

	const access = await global.generateAccessGrant(...accessGrantParameters);

	if (access.error) {
		throw new Error(access.error);
	}

	return access.value;
};
