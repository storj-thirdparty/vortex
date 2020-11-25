const fs = require('fs');
const config = require('../config');
const wasmExec = require('./wasm_exec.js');

const go = new Go();

const wasmInit = WebAssembly.instantiate(fs.readFileSync(`${__dirname}/access.wasm`), go.importObject);

wasmInit.then(result => {
	go.run(result.instance)
});

module.exports = async function(buckets = []) {
	await wasmInit;

	const permission = await global.newPermission();

	if(permission.error) {
		throw new Error(permission.error);
	}

	permission.value.AllowDownload = true;
	permission.value.AllowUpload = true;
	permission.value.AllowDelete = true;
	permission.value.AllowList = true;

	console.log(permission);


	const apiKeyPermissionParams = [
		config.masterAccount.apiKey,
		buckets,
		permission.value
	];

	console.log({ apiKeyPermissionParams });

	const restricted = await global.setAPIKeyPermission(...apiKeyPermissionParams);

	if(restricted.error) {
		throw new Error(restricted.error);
	}


	const accessGrantParams = [
		config.masterAccount.satelliteUrl,
		restricted.value,
		config.masterAccount.passphrase,
		config.masterAccount.projectId
	];

	console.log({ accessGrantParams })

	const access = await global.generateAccessGrant(...accessGrantParams);

	if(access.error) {
		throw new Error(access.error);
	}

	return access.value;
}
