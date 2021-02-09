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

	return Math.max(auditBytes + uploadBytes - deleteBytes, 0);
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

	return Math.max(auditBytes + downloadBytes - deleteBytes, 0);
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

	return Math.max(auditFiles + uploadFiles - deleteFiles, 0);
}

module.exports = async userId => ({
	bytesUploaded: await getBytesUploaded(userId),
	filesUploaded: await getFilesUploaded(userId),
	bytesDownloaded: await getBytesDownloaded(userId),
});
