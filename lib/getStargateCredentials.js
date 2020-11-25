const fs = require('fs');
const axios = require('axios');
const config = require('../config.json');

module.exports = async function(access) {
	const {data} = await axios.post(`${config.stargateAuthEndpoint}/v1/access`, {
		access_grant: access,
		public: false
	});

	return {
		accessKey: data.access_key_id,
		secretKey: data.secret_key
	};
};
