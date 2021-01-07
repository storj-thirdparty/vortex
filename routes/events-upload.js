const Event = require('../models/Event.js');

module.exports = async ctx => {
	const e = Event.build({
		type: 'upload',
		params: {
			files: ctx.request.body.files,
			bytes: ctx.request.body.bytes
		},
		userId: ctx.session.userId,
		date: new Date()
	});

	await e.save();

	ctx.body = '';
};
