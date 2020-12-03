const Sequelize = require('sequelize');
const User = require('../models/User.js');

module.exports = async ctx => {
	ctx.body = {
		users: await User.findAll({
			attributes: [
				'id',
				'email',
				'activated',
				'createTime',
				'lastLoginTime'
			],
			where: {
				email: {
					[Sequelize.Op.substring]: `%${ctx.request.body.search || ''}`
				}
			},
			limit: 10
		}),
		results: await User.count({
			where: {
				email: {
					[Sequelize.Op.substring]: `%${ctx.request.body.search || ''}`
				}
			},
			limit: 10
		})
	};
};
