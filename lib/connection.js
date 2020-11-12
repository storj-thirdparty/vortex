const r = require('rethinkdb');

module.exports = r.connect({
	db: 'wormhole'
});
