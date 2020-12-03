const fs = require('fs');
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const Redis = require('ioredis');
const ApiError = require('./lib/ApiError.js');
const session = require('./lib/session');
const sequelize = require('./lib/sequelize.js');
const config = require('./config.json');

const login = require('./routes/login.js');
const signUp = require('./routes/signUp.js');
const passiveLogin = require('./routes/passive-login.js');
const activateEmail = require('./routes/activate-email.js');
const adminUsers = require('./routes/admin-users.js');

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
		} catch (error) {
			if (error instanceof ApiError) {
				ctx.body = {
					error: error.message
				};
			} else {
				throw error;
			}
		}
	});

	router.use(async (ctx, next) => {
		if (typeof ctx.cookies.get('session') !== 'string') {
			ctx.cookies.set('session', await session.create());
		}

		try {
			ctx.session = await session.get(ctx.cookies.get('session'));
		} catch(err) {
			ctx.cookies.set('session', await session.create());
		}

		await next();

		await session.set(ctx.cookies.get('session'), ctx.session);
	});

	router.post('/api/signup', signUp, login);
	router.post('/api/login', login);
	router.post('/api/passive-login', passiveLogin);
	router.post('/api/activate-email', activateEmail);

	router.post('/api/logout', async (ctx) => {
		delete ctx.session.userId;
		ctx.body = '';
	});

	router.post('/api/admin/users', adminUsers);

	app
		.use(bodyParser())
		.use(router.routes())
		.use(router.allowedMethods());

	await sequelize.sync();

	app.listen(3000);

	console.log('Vortex has started :)');
})();
