const fs = require('fs');
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const Thinky = require('thinky');
const Redis = require('ioredis');

const thinky = Thinky({
	host: 'rethink'
});

const type = thinky.type;

const User = thinky.createModel('User', {
	email: String,
	password: String,
	createTime: type.date(),
	lastLoginTime: type.date(),
	activated: type.boolean()
});

const user = new User({
    email: 'monty@storj.io',
	password: 'sdfsd',
	createTime: Date.now(),
	lastLoginTime: Date.now(),
	activated: false
});

(async () => {

	const redis = new Redis({
		host: 'redis'
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
