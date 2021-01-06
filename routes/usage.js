const moment = require('moment');
const Sequelize = require('sequelize');
const User = require('../models/User.js');
const Event = require('../models/Event.js');
const plans = require('../plans.json');

async function getBytesUploaded(userId) {
	const [ auditEvent ] = await Event.findAll({
		where: {
			userId,
			type: 'audit-upload',
		},
		order: [ 'date', 'DESC' ],
		limit: 1
	});

	const auditBytes = typeof auditEvent === 'object' ? auditEvent.params.bytes : 0;

	const uploadEvents = await Event.findAll({
		where: {
			userId,
			type: 'upload',
			date: {
				$gte: moment().subtract(1, 'days').toDate()
			}
		}
	});

	const uploadBytes = uploadEvents.reduce((n, e) => n + e.params.bytes, 0);

	const deleteEvents = await Event.findAll({
		where: {
			userId,
			type: 'delete',
			date: {
				$gte: moment().subtract(1, 'days').toDate()
			}
		}
	});

	const deleteBytes = deleteEvents.reduce((n, e) => n + e.params.bytes, 0);

	return auditBytes + uploadBytes - deleteBytes;
}

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
		bytesUploaded: await getBytesUploaded(ctx.session.userId),

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
