const crypto = require("crypto");
const redis = require("./redis.js");

const expire = 2 * 24 * 60 * 60 * 1000;

module.exports = {
	async create() {
		const id = crypto.randomBytes(32).toString("base64");

		await redis
			.multi()
			.hset(`session:${id}`, "_created", Date.now())
			.expire(`session:${id}`, expire)
			.exec();

		return id;
	},

	async get(id) {
		return await redis.hgetall(`session:${id}`);
	},

	async set(id, state) {
		const tx = await redis.multi();

		tx.del(`session:${id}`);

		for (const key in state) {
			tx.hset(`session:${id}`, key, state[key]);
		}

		tx.expire(`session:${id}`, expire);

		await tx.exec();
	},

	async delete(id) {
		await redis.del(`session:${id}`);
	}
};
