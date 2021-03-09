const fs = require("fs");
const config = require("../config.json");
const generateAccess = require("../lib/generateAccess.js");
const getStargateCredentials = require("../lib/getStargateCredentials.js");

(async () => {
	const access = await generateAccess();

	config.masterAccount = {
		...config.masterAccount,
		...(await getStargateCredentials(access))
	};

	fs.writeFileSync(
		`${__dirname}/../config.json`,
		JSON.stringify(config, null, "\t")
	);
})();
