const axios = require("axios");
const config = require("../config.json");

(async () => {
	const token = (
		await axios.post(
			`${config.masterAccount.satelliteEndpoint}/api/v0/auth/token`,
			{
				email: config.masterAccount.username,
				password: config.masterAccount.password
			}
		)
	).data;

	console.log(token);
})();
