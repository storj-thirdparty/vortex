const fs = require('fs');
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const r = require('rethinkdb');

(async () => {

	const conn = await require('./lib/connection');

	const app = new Koa();

	const router = new Router();

	router.get('/keys', ctx => {
		ctx.redirect('/');
	});

	router.post('/api/sign-up', async ctx => {
		const { email, satelliteAddress } = ctx.request.body;

		const cursor = await r.table('accounts2')
			.orderBy('tempEmail')
			.filter({
				satelliteAddress
			})
			.filter(function (row) {
				return row.hasFields({ userEmail: true }).not()
			})
			.run(conn);

		const [account] = await cursor.toArray();

		await r.table("accounts2")
			.filter({
				tempEmail: account.tempEmail,
				satelliteAddress
			})
			.update({
				userEmail: email,
				signupTime: new Date()
			})
			.run(conn);

		ctx.body = {
			apiKey: account.apiKey,
			satelliteAddress: account.satelliteAddress
		}
	});

	app.use(require('koa-static')('dist'));

	app
		.use(bodyParser())
		.use(router.routes())
		.use(router.allowedMethods());

	app.listen(3000);

	console.log("Wormhole has started :)");

})();
