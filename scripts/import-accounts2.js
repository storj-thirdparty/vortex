const fs = require('fs');
const parse = require('csv-parse');
const r = require('rethinkdb');

async function decodeSatelliteCSV(conn, file, sattelite) {
	const parser = parse({
	  delimiter: ','
	})

	parser.on('readable', async () => {
		let record;

		let i = 0;

		while(record = parser.read()) {
			console.log(i++);
			const [ tempEmail, satelliteAddress, apiKey ] = record;

			const re = /\S+@\S+\.\S+/;

			if(!re.test(tempEmail)) {
				continue;
			}

			let cursor = await r.table('accounts2')
				.filter({
					tempEmail,
					satelliteAddress
				})
				.run(conn);

			const accounts = await cursor.toArray();

			if(accounts.length > 0) {
				continue;
			}

			cursor = await r.table('accounts')
				.filter({
					tempEmail,
					satelliteAddress
				})
				.run(conn);

			const doc = {
				tempEmail,
				satelliteAddress,
				apiKey
			};

			const [account] = await cursor.toArray();

			if(account && account.userEmail) {
				doc.userEmail = account.userEmail;
			}

			await r.table('accounts2').insert(doc).run(conn);

		}

		process.exit(0);
	})

	fs.createReadStream(file).pipe(parser);
}

(async () => {
	const conn = await require('../lib/connection');

	decodeSatelliteCSV(conn, `${__dirname}/../wormhole-users.csv`);
	decodeSatelliteCSV(conn, `${__dirname}/../wormhole-users-asia.csv`);
	decodeSatelliteCSV(conn, `${__dirname}/../wormhole-users-uscentral.csv`);
})();
