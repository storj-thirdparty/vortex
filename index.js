const fs = require('fs');
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const Redis = require('ioredis');
const mongoose = require('mongoose');

const ApiError = require('./lib/ApiError.js');
const signUp = require('./lib/signUp.js');
const login = require('./lib/login.js');

mongoose.connect('mongodb://mongo:27017/vortex', {useNewUrlParser: true});

(async () => {
	const redis = new Redis({
		host: 'redis'
	});

	const app = new Koa();
	const router = new Router();

	app.use(require('koa-static')('dist'));

	app.use(async (ctx, next) => {
		try {
			await next();
		} catch(error) {
			if(error instanceof ApiError) {
				ctx.body = {
					error: error.message
				};
			} else {
				throw error;
			}
		}
	});

	router.post('/api/signup', async ctx => {
		const {email, password, termsAndConditions} = ctx.request.body;

		await signUp(email, password, termsAndConditions);

		ctx.body = await login(email, password);
	});

	router.post('/api/login', async ctx => {
		const {email, password} = ctx.request.body;

		ctx.body = await login(email, password);
	});

	app
		.use(bodyParser())
		.use(router.routes())
		.use(router.allowedMethods());

	app.listen(3000);

	console.log("Vortex has started :)");

})();
