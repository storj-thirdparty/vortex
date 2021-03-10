import axios from "axios";
import { router } from "./main";

const listCache = new Map();

export default {
	namespaced: true,
	state: {
		path: "",
		files: [],
		uploading: [],
		deleting: [],
		preventRefresh: false,
		selectedFile: null,
		selectedFiles: [],
		shiftSelectedFiles: []
	},
	mutations: {
		updateFiles(state, { path, files }) {
			state.path = path;
			state.files = files;
		},

		setPreventRefresh(state, flag) {
			state.preventRefresh = flag;
		},

		setSelectedFile(state, { file, command }) {
			const files = [...state.selectedFiles, ...state.shiftSelectedFiles];

			if (command && files.includes(file)) {
				state.selectedFiles = state.selectedFiles.filter(
					(fileSelected) => fileSelected !== file
				);

				state.shiftSelectedFiles = state.shiftSelectedFiles.filter(
					(fileSelected) => fileSelected !== file
				);
			} else if (command && state.selectedFile) {
				const filesSelected = [
					...state.selectedFiles,
					...[state.selectedFile].filter(
						(fileSelected) =>
							!state.selectedFiles.includes(fileSelected)
					)
				];

				state.selectedFiles = [
					...filesSelected,
					...state.shiftSelectedFiles.filter(
						(file) => !filesSelected.includes(file)
					)
				];

				state.selectedFile = file;
			} else {
				state.selectedFile = file;
				state.shiftSelectedFiles = [];
				state.selectedFiles = [];
			}
		},

		setFilesToBeDeleted(state, files) {
			state.deleting = [...state.deleting, ...files];
		},

		removeFileToBeDeleted(state, file) {
			state.deleting = state.deleting.filter(
				(singleFile) => singleFile.Key !== file.Key
			);
		},

		removeAllFilesToBeDeleted(state) {
			state.deleting = [];
		},

		removeAllSelectedFiles(state) {
			state.selectedFile = null;
			state.shiftSelectedFiles = [];
		},

		setShiftSelectedFiles(state, file) {
			if (!state.selectedFile) {
				state.selectedFile = file;
				return;
			}

			let anchorIdx;
			for (let i = 0; i < state.files.length; i++) {
				if (state.files[i] === state.selectedFile) anchorIdx = i;
			}

			let shiftIdx;
			for (let i = 0; i < state.files.length; i++) {
				if (state.files[i] === file) shiftIdx = i;
			}

			if (anchorIdx > shiftIdx)
				[anchorIdx, shiftIdx] = [shiftIdx, anchorIdx];

			state.shiftSelectedFiles = state.files
				.slice(anchorIdx, shiftIdx + 1)
				.filter(
					(file) =>
						!state.selectedFiles.includes(file) &&
						file !== state.selectedFile
				);
		},

		sortFiles(state, { heading, order }) {
			const files = [...state.files];

			if (order === "asc") {
				if (heading === "LastModified") {
					files.sort(
						(a, b) =>
							new Date(a.LastModified) - new Date(b.LastModified)
					);
				} else if (heading === "Key") {
					files.sort((a, b) => a.Key.localeCompare(b.Key));
				} else {
					files.sort((a, b) => a[heading] - b[heading]);
				}
			} else {
				if (heading === "LastModified") {
					files.sort(
						(a, b) =>
							new Date(b.LastModified) - new Date(a.LastModified)
					);
				} else if (heading === "Key") {
					files.sort((a, b) => b.Key.localeCompare(a.Key));
				} else {
					files.sort((a, b) => b[heading] - a[heading]);
				}
			}

			state.files = [
				...files.filter((file) => file.type === "folder"),
				...files.filter((file) => file.type === "file")
			];
		},

		pushUpload(state, file) {
			state.uploading.push(file);
		},

		setProgress(state, { Key, progress }) {
			state.uploading.find(
				(file) => file.Key === Key
			).progress = progress;
		},

		finishUpload(state, Key) {
			state.uploading = state.uploading.filter(
				(file) => file.Key !== Key
			);
		}
	},
	actions: {
		async list({ commit, state, rootState }, path) {
			if (typeof path !== "string") {
				path = state.path;
			}

			if (listCache.has(path) === true) {
				commit("updateFiles", {
					path,
					files: listCache.get(path)
				});
			}

			const response = await rootState.s3
				.listObjects({
					Bucket: rootState.stargateBucket,
					Delimiter: "/",
					Prefix: path
				})
				.promise();

			// handle paths that don't exist
			if (response.Prefix !== "" && response.Contents.length === 0) {
				router.push({ name: "404", params: { context: "folder" } });
				return;
			}

			const { Contents, CommonPrefixes } = response;

			Contents.sort((a, b) =>
				a.LastModified < b.LastModified ? -1 : -1
			);

			const files = [
				...CommonPrefixes.map(({ Prefix }) => ({
					Key: Prefix.slice(path.length, -1),
					LastModified: new Date(0),
					type: "folder"
				})),
				...Contents.map((file) => ({
					...file,
					Key: file.Key.slice(path.length),
					type: "file"
				}))
					.filter((file) => file.Key.length > 0)
					.filter((file) => file.Key !== ".vortex_placeholder")
			];

			listCache.set(path, files);
			commit("updateFiles", {
				path,
				files
			});
		},

		async back({ state, dispatch }) {
			const path = state.path;

			let i = path.length - 2;

			while (path[i - 1] !== "/" && i > 0) {
				i--;
			}

			const newPath = path.slice(0, i);

			dispatch("list", newPath);
		},

		async upload({ commit, state, rootState, dispatch }, e) {
			//dispatch('updatePreventRefresh', true);

			const files = e.dataTransfer
				? e.dataTransfer.files
				: e.target.files;

			await Promise.all(
				[...files].map(async (file) => {
					// Handle duplicate file names
					const fileNames = state.files.map((file) => file.Key);
					let count = 0;
					let fileName = file.name;

					while (fileNames.includes(fileName)) {
						count += 1;

						if (count > 1) {
							fileName = fileName.replace(
								/\((\d+)\)(.*)/,
								`(${count})$2`
							);
						} else {
							fileName = fileName.replace(
								/([^.]*)(.*)/,
								`$1 (${count})$2`
							);
						}
					}
					//

					const params = {
						Bucket: rootState.stargateBucket,
						Key: state.path + fileName,
						Body: file
					};

					commit("pushUpload", {
						...params,
						progress: 0
					});

					const upload = rootState.s3.upload({
						...params
					});

					upload.on("httpUploadProgress", (progress) => {
						commit("setProgress", {
							Key: params.Key,
							progress: Math.round(
								(progress.loaded / progress.total) * 100
							)
						});
					});

					await upload.promise();

					await dispatch("list");

					commit("finishUpload", params.Key);

					await axios.post("/api/events/upload", {
						bytes: file.size,
						files: 1
					});
				})
			);

			//dispatch('updatePreventRefresh', false);
		},

		async createFolder({ state, dispatch, rootState }, name) {
			await rootState.s3
				.putObject({
					Bucket: rootState.stargateBucket,
					Key: state.path + name + "/.vortex_placeholder"
				})
				.promise();

			dispatch("list");

			await axios.post("/api/events/upload", {
				bytes: 0,
				files: 1
			});
		},

		async delete({ commit, dispatch, rootState }, { path, file, folder }) {
			await rootState.s3
				.deleteObject({
					Bucket: rootState.stargateBucket,
					Key: path + file.Key
				})
				.promise();

			await axios.post("/api/events/delete", {
				bytes: file.Size,
				files: 1
			});

			if (!folder) {
				await dispatch("list");
				commit("removeFileToBeDeleted", file);
			}
		},

		async deleteFolder({ commit, dispatch, rootState }, { file, path }) {
			async function recurse(filePath) {
				const { Contents, CommonPrefixes } = await rootState.s3
					.listObjects({
						Bucket: rootState.stargateBucket,
						Delimiter: "/",
						Prefix: filePath
					})
					.promise();

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

				await Promise.all([thread(), thread(), thread()]);

				for (const { Prefix } of CommonPrefixes) {
					await recurse(Prefix);
				}
			}

			await recurse(path.length > 0 ? path + file.Key : file.Key + "/");

			commit("removeFileToBeDeleted", file);
			await dispatch("list");
			dispatch("updatePreventRefresh", false);
		},

		async deleteSelected({ rootState, state, dispatch, commit }) {
			const filesToDelete = [
				state.selectedFile,
				...state.selectedFiles,
				...state.shiftSelectedFiles
			];

			commit("setPreventRefresh", true);
			commit("setFilesToBeDeleted", filesToDelete);

			await Promise.all(
				filesToDelete.map(async (file) => {
					if (file.type === "file")
						await dispatch("delete", {
							file,
							path: rootState.files.path
						});
					else
						await dispatch("deleteFolder", {
							file,
							path: rootState.files.path
						});
				})
			);

			commit("setSelectedFile", { file: null, command: false });
			commit("setPreventRefresh", false);
		},

		sortAllFiles({ commit }, { heading, order }) {
			commit("setSelectedFile", null);
			if (heading === "name")
				commit("sortFiles", { heading: "Key", order });
			else if (heading === "size")
				commit("sortFiles", { heading: "Size", order });
			else if (heading === "date")
				commit("sortFiles", { heading: "LastModified", order });
		},

		updatePreventRefresh({ commit }, flag) {
			commit("setPreventRefresh", flag);
		},

		updateSelectedFile({ commit }, { file, command }) {
			commit("setSelectedFile", { file, command });
		},

		addToShiftSelectedFiles({ commit }, file) {
			commit("setShiftSelectedFiles", file);
		},

		addFileToBeDeleted({ commit }, file) {
			commit("setFilesToBeDeleted", [file]);
		},

		removeFileFromToBeDeleted({ commit }, file) {
			commit("removeFileToBeDeleted", file);
		},

		clearAllSelectedFiles({ commit }) {
			commit("removeAllSelectedFiles");
		}
	}
};
