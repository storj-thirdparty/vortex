const Sequelize = require("sequelize");
const User = require("../models/User.js");
const Event = require("../models/Event.js");
const plans = require("../plans.json");
const getStats = require("../lib/getStats.js");

module.exports = async ctx => {
	let users = await User.findAll({
		attributes: [
			"id",
			"email",
			"activated",
			"createTime",
			"lastLoginTime",
			"planId"
		],
		where: {
			email: {
				[Sequelize.Op.substring]: `%${ctx.request.body.search || ""}`
			}
		},
		order: [
			["lastLoginTime", "DESC"],
		],
		limit: 50,
		include: Event
	});

	console.log(users);

	users = await Promise.all(users.map(async user => {
		const stats = await getStats(user.id);

		return {
			id: user.id,
			email: user.email,
			activated: user.activated,
			createTime: user.createTime,
			lastLoginTime: user.lastLoginTime,
			planId: user.planId,

			bytesUsed: stats.bytesUploaded,
			filesUsed: stats.filesUploaded,
			filesDownloaded: 0,
			bytesDownloaded: stats.bytesDownloaded
		};
	}));

	ctx.body = {
		users,
		results: await User.count({
			where: {
				email: {
					[Sequelize.Op.substring]: `%${ctx.request.body.search || ""}`
				}
			}
		}),
		plans
	};
};
