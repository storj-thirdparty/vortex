const Sequelize = require('sequelize');
const User = require('../models/User.js');
const Event = require('../models/Event.js');
const plans = require('../plans.json');

module.exports = async ctx => {
	const user = await User.findOne({
		attributes: [
			'planId'
		],
		where: {
			id: ctx.session.userId
		},
		limit: 10,
		include: Event
	});

	console.log(user.planId);

	console.log(user.Events.filter(e => e.type === 'delete'));

	return ctx.body = {
		bytesUploaded: user.Events
			.filter(event => event.type === "upload")
			.reduce((n, e) => n + e.params.bytes, 0) -
				user.Events
					.filter(event => event.type === "delete")
					.reduce((n, e) => n + e.params.bytes, 0),

		bytesUploadedQuota: plans[user.planId].storageBytesQuota,

		filesUploaded: user.Events
			.filter(event => event.type === "upload")
			.reduce((n, e) => n + e.params.files, 0) -
				user.Events
					.filter(event => event.type === "delete")
					.reduce((n, e) => n + e.params.files, 0),

		filesUploadedQuota: plans[user.planId].storageFilesQuota,

		filesDownloaded: user.Events
			.filter(event => event.type === "download")
			.reduce((n, e) => n + e.params.files, 0),

		// filesDownloaded:

		bytesDownloaded: user.Events
			.filter(event => event.type === "download")
			.reduce((n, e) => n + e.params.bytes, 0),

		bytesDownloadedQuota: plans[user.planId].downloadBytesQuota
	};
};
