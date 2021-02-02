export default {
	state: {
		path: '',
		files: []
	},
	mutations: {
		updateFiles(state, {path, files}) {
			state.path = path;
			state.files = files;
		}
	},
	actions: {
		async list({commit, state, rootState}, path) {
			if(typeof path !== 'string') {
				path = state.path;
			}

			console.log({rootState});

			const response = await rootState.s3.listObjects({
				Bucket: rootState.stargateBucket,
				Delimiter: '/',
				Prefix: path
			}).promise();

			const {
				Contents,
				CommonPrefixes
			} = response;

			console.log({
				Contents,
				CommonPrefixes
			});

			Contents.sort((a, b) => a.LastModified < b.LastModified ? -1 : -1);

			const filenames = new Set();

			const files = [
				...CommonPrefixes.map(({
					Prefix
				}) => ({
					Key: Prefix.slice(path.length, -1),
					LastModified: new Date(0),
					type: 'folder',
				})),
				...Contents.map(file => ({
					...file,
					Key: file.Key.slice(path.length),
					type: 'file'
				}))
			];

			commit('updateFiles', {path, files});
		}
	}
};
