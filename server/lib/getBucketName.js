const config = require("../config.json");

module.exports = (user) => config.bucketPrefix + user.id.toString();
