const parse = require('csv-parse');
const r = require('rethinkdb');

(async () => {
        const conn = await require('../lib/connection');

        const cursor = await r.table('accounts2')
                .orderBy('signupTime')
                .filter(r.row('userEmail'))
                .run(conn);

        const arr = await cursor.toArray();

        for(const user of arr.slice(arr.length - 10)) {
                console.log(user);
        }

        console.log('Found', arr.length, 'accounts');

        async function printSatelliteUsed(satellite) {
                console.log(satellite, arr.filter(el => el.satelliteAddress == satellite).length)
        }

        printSatelliteUsed('europe-west-1.tardigrade.io');
        printSatelliteUsed('us-central-1.tardigrade.io');
        printSatelliteUsed('asia-east-1.tardigrade.io');

        process.exit(0);

})();
