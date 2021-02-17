const User = require("../models/User.js");

module.exports = async ctx => {
	const user = await User.findOne({
		where: {
			id: ctx.request.body.userId
		}
	});

	user.planId = ctx.request.body.planId;

	await user.save();

	ctx.body = "";
};
