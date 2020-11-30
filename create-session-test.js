const session = require('./lib/session');

(async () => {
	const id = await session.create();

	console.log(await session.get(id));
})();
