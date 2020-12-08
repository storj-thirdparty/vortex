const Sequelize = require('sequelize');
const User = require('../models/User.js');
const Event = require('../models/Event.js');

module.exports = async ctx => {
	const user = await User.findOne({
		attributes: [
			'id',
			'email',
			'createTime',
			'activated',
			'lastLoginTime'
		],
		where: {
			id: ctx.params.id
		},
		include: Event
	});

	ctx.body = {
		id: user.id,
		email: user.email,
		createTime: user.createTime,
		activated: user.activated,
		lastLoginTime: user.lastLoginTime,
		Events: {
			bytesUploaded: user.Events
				.filter(event => event.type === "upload")
				.reduce((n, e) => n + e.params.bytes, 0),
			filesUploaded: user.Events
				.filter(event => event.type === "upload")
				.reduce((n, e) => n + e.params.files, 0),
			bytesDeleted: user.Events
				.filter(event => event.type === "delete")
				.reduce((n, e) => n + e.params.bytes, 0),
			filesDeleted: user.Events
				.filter(event => event.type === "delete")
				.reduce((n, e) => n + e.params.files, 0),
			bytesDownloaded: user.Events
				.filter(event => event.type === "download")
				.reduce((n, e) => n + e.params.bytes, 0),
			filesDownloaded: user.Events
				.filter(event => event.type === "download")
				.reduce((n, e) => n + e.params.files, 0)
		}
	};
};
