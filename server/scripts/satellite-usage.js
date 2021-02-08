const axios = require('axios');
const User = require('../models/User.js');
const Event = require('../models/Event.js');
const config = require('../config.json');

(async () => {
	const date = new Date();

	const token = process.argv[2];

	const {
		data: {
			data: {
				project: {
					bucketUsages
				}
			}
		}
	} = await axios.post(`${config.masterAccount.satelliteEndpoint}/api/v0/graphql`, {
		"operationName": null,
		"variables": {
			"projectId": config.masterAccount.projectId,
			"before": date,
			"limit": 250,
			"search": "",
			"page": 1
		},
		"query": `query ($projectId: String!, $before: DateTime!, $limit: Int!, $search: String!, $page: Int!) {
			  project(id: $projectId) {
			    bucketUsages(before: $before, cursor: {limit: $limit, search: $search, page: $page}) {
			      bucketUsages {
			        bucketName
			        storage
			        egress
			        objectCount
			        since
			        before
			        __typename
			      }
			      search
			      limit
			      offset
			      pageCount
			      currentPage
			      totalCount
			      __typename
			    }
			    __typename  }
			}`
	}, {
		headers: {
			"Content-Type": "application/json",
			Cookie: `_tokenKey=${token}`
		}
	});

	for(const bucket of bucketUsages.bucketUsages) {
		if(bucket.bucketName.startsWith(config.bucketPrefix)) {
			console.log(bucket);
			const userId = bucket.bucketName.slice(config.bucketPrefix.length);

			const user = await User.findOne({
				where: {id: userId}
			})

			const uploadEvent = Event.build({
				type: 'audit-upload',
				params: {
					files: bucket.objectCount,
					bytes: bucket.storage * 1e+9
				},
				userId: userId,
				date: date
			});

			await uploadEvent.save();

			const downloadEvent = Event.build({
				type: 'audit-download',
				params: {
					files: bucket.objectCount,
					bytes: bucket.egress * 1e+9
				},
				userId: userId,
				date: date
			});

			await downloadEvent.save();

		} else {
			console.log('found', bucket.bucketName, 'with bad prefix');
		}
	}
})();
