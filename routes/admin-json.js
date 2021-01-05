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
			'lastLoginTime',
			'planId'
		],
		where: {
			id: ctx.params.id
		},
		include: Event
	});

	const auditResults = {};

	try {
		auditResults.lastAuditTime = user.Events
			.filter(event => event.type === 'audit-upload')
			.pop()
			.date;
	} catch(err) {}

	try {
		auditResults.lastAuditUpload = user.Events
			.filter(event => event.type === 'audit-upload')
			.pop()
			.params
			.bytes

		auditResults.storageSum = auditResults.lastAuditUpload +
			user.Events
				.filter(event => event.type === "upload")
				.filter(event => (new Date(event.date)).toTime() > (Date.now() - 24 * 60 * 60 * 1000))
				.reduce((n, e) => n + e.params.bytes, 0);
	} catch(err) {}

	try {
		auditResults.lastAuditFiles = user.Events
			.filter(event => event.type === 'audit-upload')
			.pop()
			.params
			.files;
	} catch(err) {}

	try {
		auditResults.lastAuditDownload = user.Events
			.filter(event => event.type === 'audit-download')
			.pop()
			.params
			.bytes;
	} catch(err) {}

	ctx.body = {
		id: user.id,
		email: user.email,
		createTime: user.createTime,
		activated: user.activated,
		lastLoginTime: user.lastLoginTime,
		planId: user.planId,
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
				.reduce((n, e) => n + e.params.files, 0),
			...auditResults
		}
	};
};
