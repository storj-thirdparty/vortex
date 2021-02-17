const { Sequelize } = require("sequelize");

module.exports = new Sequelize("postgres://postgres:password@postgres:5432/vortex");
