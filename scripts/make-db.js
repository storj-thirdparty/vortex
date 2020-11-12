(async () => {

	const r = require('rethinkdb');

	const conn = await r.connect();

	await r.dbCreate('wormhole').run(conn);

	await r.db('wormhole').tableCreate('accounts').run(conn);

	process.exit(0);

})();
