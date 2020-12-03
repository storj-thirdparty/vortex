const Sequelize = require('sequelize');
const User = require('../models/User.js');
const Event = require('../models/Event.js');

module.exports = async ctx => {
	let users = await User.findAll({
		attributes: [
			'id',
			'email',
			'activated',
			'createTime',
			'lastLoginTime'
		],
		where: {
			email: {
				[Sequelize.Op.substring]: `%${ctx.request.body.search || ''}`
			}
		},
		limit: 10,
		include: Event
	});

	console.log(users);

	users = await Promise.all(users.map(user => {
		return {
			id: user.id,
			email: user.email,
			activated: user.activated,
			createTime: user.createTime,
			lastLoginTime: user.lastLoginTime,

			bytesUploaded: user.Events
				.filter(event => event.type === "upload")
				.reduce((n, e) => n + e.params.bytes, 0),

			filesUploaded: user.Events
				.filter(event => event.type === "upload")
				.reduce((n, e) => n + e.params.files, 0),

			filesDownloaded: user.Events
				.filter(event => event.type === "download")
				.reduce((n, e) => n + e.params.files, 0),

			bytesDownloaded: user.Events
				.filter(event => event.type === "download")
				.reduce((n, e) => n + e.params.bytes, 0)
		};
	}));

	ctx.body = {
		users,
		results: await User.count({
			where: {
				email: {
					[Sequelize.Op.substring]: `%${ctx.request.body.search || ''}`
				}
			},
			limit: 10
		})
	};


};
