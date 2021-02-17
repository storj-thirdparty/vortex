const Redis = require("ioredis");

module.exports = new Redis({
	host: "redis"
});
