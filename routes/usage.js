const Sequelize = require('sequelize');
const User = require('../models/User.js');
const Event = require('../models/Event.js');

module.exports = async ctx => {
	const user = await User.findOne({
		attributes: [],
		where: {
			id: ctx.session.userId
		},
		limit: 10,
		include: Event
	});

	console.log(user.Events.filter(e => e.type === 'delete'));

	return ctx.body = {
		bytesUploaded: user.Events
			.filter(event => event.type === "upload")
			.reduce((n, e) => n + e.params.bytes, 0) -
				user.Events
					.filter(event => event.type === "delete")
					.reduce((n, e) => n + e.params.bytes, 0),

		bytesUploadedQuota: 1e+9,

		filesUploaded: user.Events
			.filter(event => event.type === "upload")
			.reduce((n, e) => n + e.params.files, 0) -
				user.Events
					.filter(event => event.type === "delete")
					.reduce((n, e) => n + e.params.files, 0),

		filesUploadedQuota: 1000,

		filesDownloaded: user.Events
			.filter(event => event.type === "download")
			.reduce((n, e) => n + e.params.files, 0),

		// filesDownloaded:

		bytesDownloaded: user.Events
			.filter(event => event.type === "download")
			.reduce((n, e) => n + e.params.bytes, 0),

		bytesDownloadedQuota: 1e+9
	};
};
