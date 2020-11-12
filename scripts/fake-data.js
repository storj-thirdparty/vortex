const r = require('rethinkdb');

(async () => {
	const conn = await r.connect();

	await r.dbCreate('wormhole').run(conn);

	await r.db('wormhole').tableCreate('accounts', {
		primaryKey: 'tempEmail'
	}).run(conn);

	for(let i = 0; i < 1000; i++) {
		await r.db('wormhole').table('accounts').insert({
			tempEmail: `wormhole-dev-test-${i}@storj.io`,
			satelliteAddress: 'my-fake-satellite.tardigrade.io',
			apiKey: 'xxxxxxxxxxxxxxxxxxxxxxx'
		}).run(conn);
	}

	process.exit(0);

})();
