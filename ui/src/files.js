import axios from 'axios';

const listCache = new Map();

export default {
	namespaced: true,
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

			if(listCache.has(path) === true) {
				commit('updateFiles', {
					path,
					files: listCache.get(path)
				});
			}

			if(rootState.s3 === null) {
				return;
			}

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

			listCache.set(path, files);
			commit('updateFiles', {path, files});
		},

		async back({commit, state, dispatch}) {
			const path = state.path;

			let i = path.length - 2;

			while(path[i - 1] !== '/' && i > 0) {
				i--;
			}

			const newPath = path.slice(0, i);

			dispatch('list', newPath);
		},

		async createFolder({commit, state, dispatch, rootState}, name) {
			await rootState.s3.putObject({
				Bucket: rootState.stargateBucket,
				Key: state.path + name + '/.vortex_placeholder'
			}).promise();

			dispatch('list');

			await axios.post('/api/events/upload', {
				bytes: 0,
				files: 1
			});
		}

	}
};
