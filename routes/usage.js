const { Op } = require('sequelize');
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
		order: [
			[ 'date', 'DESC' ]
		],
		limit: 1
	});

	const auditBytes = typeof auditEvent === 'object' ? auditEvent.params.bytes : 0;

	const uploadEvents = await Event.findAll({
		where: {
			userId,
			type: 'upload',
			date: {
				[Op.gte]: moment().subtract(1, 'days').toDate()
			}
		}
	});


	const uploadBytes = uploadEvents.reduce((n, e) => n + e.params.bytes, 0);

	const deleteEvents = await Event.findAll({
		where: {
			userId,
			type: 'delete',
			date: {
				[Op.gte]: moment().subtract(1, 'days').toDate()
			}
		}
	});

	const deleteBytes = deleteEvents.reduce((n, e) => n + e.params.bytes, 0);

	return auditBytes + uploadBytes - deleteBytes;
}

async function getBytesDownloaded(userId) {
	const [ auditEvent ] = await Event.findAll({
		where: {
			userId,
			type: 'audit-download',
		},
		order: [
			[ 'date', 'DESC' ]
		],
		limit: 1
	});

	const auditBytes = typeof auditEvent === 'object' ? auditEvent.params.bytes : 0;

	const downloadEvents = await Event.findAll({
		where: {
			userId,
			type: 'download',
			date: {
				[Op.gte]: moment().subtract(1, 'days').toDate()
			}
		}
	});

	const downloadBytes = downloadEvents.reduce((n, e) => n + e.params.bytes, 0);

	const deleteEvents = await Event.findAll({
		where: {
			userId,
			type: 'delete',
			date: {
				[Op.gte]: moment().subtract(1, 'days').toDate()
			}
		}
	});

	const deleteBytes = deleteEvents.reduce((n, e) => n + e.params.bytes, 0);

	return auditBytes + downloadBytes - deleteBytes;
}

async function getFilesUploaded(userId) {
	const [ auditEvent ] = await Event.findAll({
		where: {
			userId,
			type: 'audit-upload',
		},
		order: [
			[ 'date', 'DESC' ]
		],
		limit: 1
	});

	const auditFiles = typeof auditEvent === 'object' ? auditEvent.params.files : 0;

	const uploadEvents = await Event.findAll({
		where: {
			userId,
			type: 'upload',
			date: {
				[Op.gte]: moment().subtract(1, 'days').toDate()
			}
		}
	});

	const uploadFiles = uploadEvents.reduce((n, e) => n + e.params.files, 0);

	const deleteEvents = await Event.findAll({
		where: {
			userId,
			type: 'delete',
			date: {
				[Op.gte]: moment().subtract(1, 'days').toDate()
			}
		}
	});

	const deleteFiles = deleteEvents.reduce((n, e) => n + e.params.files, 0);

	return auditFiles + uploadFiles - deleteFiles;
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
		filesUploaded: await getFilesUploaded(ctx.session.userId),
		filesUploadedQuota: plans[user.planId].storageFilesQuota,
		bytesDownloaded: await getBytesDownloaded(ctx.session.userId),
		bytesDownloadedQuota: plans[user.planId].downloadBytesQuota
		//filesDownloaded:  user.Events
		//	.filter(event => event.type === "download")
		//	.reduce((n, e) => n + e.params.files, 0),

		// filesDownloaded:
	};
};
