const User = require("../models/User");
const getStats = require("../lib/getStats");
const plans = require("../plans.json");

module.exports = async ctx => {
	const user = await User.findOne({
		where: {
			id: ctx.session.userId
		}
	});

	ctx.body = {
		...await getStats(ctx.session.userId),
		bytesUploadedQuota: plans[user.planId].storageBytesQuota,
		filesUploadedQuota: plans[user.planId].storageFilesQuota,
		bytesDownloadedQuota: plans[user.planId].downloadBytesQuota
	};
};
