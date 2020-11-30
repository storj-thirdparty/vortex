const fs = require('fs');
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const Redis = require('ioredis');
const ApiError = require('./lib/ApiError.js');
const signUp = require('./lib/signUp.js');
const login = require('./lib/login.js');
const activateEmail = require('./lib/activateEmail.js');
const session = require('./lib/session');
const sequelize = require('./lib/sequelize.js');
const config = require('./config.json');


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

		ctx.session = await session.get(ctx.cookies.get('session'));

		await next();

		await session.set(ctx.cookies.get('session'), ctx.session);
	});

	router.post('/api/signup', async ctx => {
		const {email, password, termsAndConditions} = ctx.request.body;

		await signUp(email, password, termsAndConditions);

		ctx.body = await login(email, password);
	});

	router.post('/api/login', async ctx => {
		const {email, password} = ctx.request.body;

		const user = await login(email, password);

		ctx.session.userId = user.id;

		ctx.body = {
			email: user.email,
			stargateCredentials: {
				accessKey: user.stargateAccessKey,
				secretKey: user.stargateSecretKey
			},
			bucket: 'user' + user.id.toString(),
			stargateEndpoint: config.stargateEndpoint,
			activated: user.activated
		};

		console.log(this.session);
	});

	/*

	router.post('/api/passive-login', async ctx => {
		const user = await User.findOne({
			_id: ctx.session.userId
		});

		if (user === null) {
			throw new ApiError('Session invalid.');
		}

		ctx.body = {
			email: user.email,
			stargateCredentials: user.stargateCredentials || {},
			bucket: user.id.toString(),
			stargateEndpoint: config.stargateEndpoint,
			activated: user.activated
		};
	});

	router.get('/api/admin/users', async ctx => {
		ctx.body = await User.find({});
	});
	*/

	app
		.use(bodyParser())
		.use(router.routes())
		.use(router.allowedMethods());

	await sequelize.sync();

	app.listen(3000);

	console.log('Vortex has started :)');
})();
