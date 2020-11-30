const User = require('../models/User.js');

module.exports = async ctx => {
	ctx.body = await User.findAll();
};
