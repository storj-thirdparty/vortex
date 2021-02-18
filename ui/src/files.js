import axios from "axios";

const listCache = new Map();

export default {
	namespaced: true,
	state: {
		path: '',
		files: [],
		uploading: [],
		preventRefresh: false,
	},
	mutations: {
		updateFiles(state, {
			path,
			files
		}) {
			state.path = path;
			state.files = files;
		},

		setPreventRefresh(state, flag) {
			state.preventRefresh = flag;
		},

		sortFiles(state, {
			heading,
			order
		}) {
			if (order === "asc") {
				if (heading === "LastModified") {
					state.files.sort((a, b) => new Date(a.LastModified) - new Date(b.LastModified));
				} else if (heading === "Key") {
					state.files.sort((a, b) => a.Key.localeCompare(b.Key));
				} else {
					state.files.sort((a, b) => a[heading] - b[heading]);
				}
			} else {
				if (heading === "LastModified") {
					state.files.sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified));
				} else if (heading === "Key") {
					state.files.sort((a, b) => b.Key.localeCompare(a.Key));
				} else {
					state.files.sort((a, b) => b[heading] - a[heading]);
				}
			}
		},

		pushUpload(state, file) {
			state.uploading.push(file);
		},

		setProgress(state, {
			Key,
			progress
		}) {
			state.uploading.find(file => file.Key === Key).progress = progress;
		},

		finishUpload(state, Key) {
			state.uploading = state.uploading.filter(file => file.Key !== Key);
		}
	},
	actions: {
		async list({
			commit,
			state,
			rootState
		}, path) {
			if (typeof path !== "string") {
				path = state.path;
			}

			if (listCache.has(path) === true) {
				commit("updateFiles", {
					path,
					files: listCache.get(path)
				});
			}

			if (rootState.s3 === null) {
				return;
			}

			const response = await rootState.s3.listObjects({
				Bucket: rootState.stargateBucket,
				Delimiter: "/",
				Prefix: path
			}).promise();

			const {
				Contents,
				CommonPrefixes
			} = response;

			Contents.sort((a, b) => a.LastModified < b.LastModified ? -1 : -1);

			const files = [
				...CommonPrefixes.map(({
					Prefix
				}) => ({
					Key: Prefix.slice(path.length, -1),
					LastModified: new Date(0),
					type: "folder",
				})),
				...Contents.map(file => ({
					...file,
					Key: file.Key.slice(path.length),
					type: "file"
				}))
				.filter(file => file.Key.length > 0)
				.filter(file => file.Key !== ".vortex_placeholder")
			];

			listCache.set(path, files);
			commit("updateFiles", {
				path,
				files
			});
		},

		async back({
			state,
			dispatch
		}) {
			const path = state.path;

			let i = path.length - 2;

			while (path[i - 1] !== "/" && i > 0) {
				i--;
			}

			const newPath = path.slice(0, i);

			dispatch("list", newPath);
		},

		async upload({
			commit,
			state,
			rootState,
			dispatch
		}, e) {
			//dispatch('updatePreventRefresh', true);

			const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;

			await Promise.all([...files].map(async file => {
				const params = {
					Bucket: rootState.stargateBucket,
					Key: state.path + file.name,
					Body: file
				};

				commit("pushUpload", {
					...params,
					progress: 0
				});

				const upload = rootState.s3.upload({
					...params
				});

				upload.on('httpUploadProgress', progress => {
					commit("setProgress", {
						Key: params.Key,
						progress: Math.round(progress.loaded / progress.total * 100)
					});
				});

				await upload.promise();

				await dispatch("list");

				commit("finishUpload", params.Key);

				await axios.post("/api/events/upload", {
					bytes: file.size,
					files: 1
				});
			}));

			//dispatch('updatePreventRefresh', false);
		},

		async createFolder({
			state,
			dispatch,
			rootState
		}, name) {
			await rootState.s3.putObject({
				Bucket: rootState.stargateBucket,
				Key: state.path + name + "/.vortex_placeholder"
			}).promise();

			dispatch("list");

			await axios.post("/api/events/upload", {
				bytes: 0,
				files: 1
			});
		},

		async delete({
			dispatch,
			rootState
		}, {
			path,
			file,
			folder
		}) {
			await rootState.s3.deleteObject({
				Bucket: rootState.stargateBucket,
				Key: path + file.Key
			}).promise();

			await axios.post("/api/events/delete", {
				bytes: file.Size,
				files: 1
			});

			if (!folder) {
				dispatch('updatePreventRefresh', false);
				dispatch("list");
			}

		},

		async deleteFolder({
			dispatch,
			rootState
		}, {
			file,
			path
		}) {
			async function recurse(filePath) {
				const {
					Contents,
					CommonPrefixes
				} = await rootState.s3.listObjects({
					Bucket: rootState.stargateBucket,
					Delimiter: "/",
					Prefix: filePath,
				}).promise();

				async function thread() {
					while (Contents.length) {
						const file = Contents.pop();

						await dispatch("delete", {
							path: "",
							file,
							folder: true
						});
					}
				}

				await Promise.all([
					thread(),
					thread(),
					thread()
				]);

				for (const {
						Prefix
					} of CommonPrefixes) {
					await recurse(Prefix);
				}
			}

			await recurse(path.length > 0 ? path + file.Key : file.Key + "/");

			await dispatch("list");
			dispatch('updatePreventRefresh', false);
		},

		sortAllFiles({
			commit
		}, {
			heading,
			order
		}) {
			if (heading === "name") commit("sortFiles", {
				heading: "Key",
				order
			});
			else if (heading === "size") commit("sortFiles", {
				heading: "Size",
				order
			});
			else if (heading === "date") commit("sortFiles", {
				heading: "LastModified",
				order
			});
		},

		updatePreventRefresh({
			commit
		}, flag) {
			commit('setPreventRefresh', flag);
		},

	}
};
