const { Model, DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize');

class User extends Model {};

User.init({
	email: {
		type: DataTypes.STRING,
		unique: true,
	},
	password: DataTypes.STRING,
	createTime: DataTypes.DATE,
	lastLoginTime: DataTypes.DATE,
	lastEmailTime: DataTypes.DATE,
	stargateAccessKey: DataTypes.STRING,
	stargateSecretKey: DataTypes.STRING
}, {
	sequelize,
	modelName: 'User'
});

module.exports = User;
