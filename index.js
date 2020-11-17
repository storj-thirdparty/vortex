const fs = require('fs');
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const r = require('rethinkdb');
const Redis = require('ioredis');

(async () => {

	const redis = new Redis({
		host: 'redis'
	});

	r.connect({
		host: 'rethink'
	});

	const app = new Koa();
	const router = new Router();

	app.use(require('koa-static')('dist'));

	app
		.use(bodyParser())
		.use(router.routes())
		.use(router.allowedMethods());

	app.listen(3000);

	console.log("Vortex has started :)");

})();
