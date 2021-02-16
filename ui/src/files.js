import axios from 'axios';

const listCache = new Map();

export default {
	namespaced: true,
	state: {
		path: '',
		files: [],
		isUploading: false,
	},
	mutations: {
		updateFiles(state, {path, files}) {
			state.path = path;
			state.files = files;
		},

		setUploading(state, flag) {
			state.isUploading = flag;
		},

		sortFiles(state, { heading, order }) {
			if (order === 'asc') {
				if (heading === 'LastModified') {
					state.files.sort((a, b) => new Date(a.LastModified) - new Date(b.LastModified));
				} else if (heading === 'Key') {
					state.files.sort((a, b) => a.Key.localeCompare(b.Key));
				} else {
					state.files.sort((a, b) => a[heading] - b[heading]);
				}
			} else {
				if (heading === 'LastModified') {
					state.files.sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified));
				} else if (heading === 'Key') {
					state.files.sort((a, b) => b.Key.localeCompare(a.Key));
				} else {
					state.files.sort((a, b) => b[heading] - a[heading]);
				}
			}
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
		},

		async delete({dispatch, rootState}, { path, file, folder }) {
			await rootState.s3.deleteObject({
				Bucket: rootState.stargateBucket,
				Key: path + file.Key
			}).promise();

			await axios.post('/api/events/delete', {
				bytes: file.Size,
				files: 1
			});

			if (!folder) dispatch('list');
		},

		async deleteFolder({dispatch, rootState}, { file, path }) {
			const allFiles = [];
			path = path.length > 0 ? path + file.Key : file.Key + '/';

			async function recurse(filePath) {
				const response = await rootState.s3.listObjects({
					Bucket: rootState.stargateBucket,
					Delimiter: '/',
					Prefix: filePath,
				}).promise();

				const { Contents, CommonPrefixes } = response;

				Contents.forEach((file) => {
					allFiles.push(dispatch('delete', { path: '', file, folder: true }));
				});

				for (let i = 0; i < CommonPrefixes.length; i++) {
					const folder = CommonPrefixes[i];
					await recurse(folder.Prefix);
				}
			}

			await recurse(path);
			Promise.all(allFiles).then((_) => dispatch('list'));
		},

		sortAllFiles({ commit }, { heading, order }) {
			if (heading === 'name') commit('sortFiles', { heading: 'Key', order });
			else if (heading === 'size') commit('sortFiles', { heading: 'Size', order });
			else if (heading === 'date') commit('sortFiles', { heading: 'LastModified', order });
		},

		updateUploading({ commit }, flag) {
			commit('setUploading', flag);
		},

	}
};
