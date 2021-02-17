const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/sequelize");

const User = require("./User.js");

class Event extends Model {}

Event.init({
	type: DataTypes.STRING,
	params: DataTypes.JSONB,
	date: DataTypes.DATE
}, {
	sequelize,
	modelName: "Event"
});

User.hasMany(Event, {
	foreignKey: "userId"
});

Event.belongsTo(User);

module.exports = Event;
