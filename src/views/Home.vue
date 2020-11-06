<style>
.upload-area {
	height: 200px;
	background: white;
	border-radius: 5px;

	text-align: center;
	padding-top: 10px;
	border: 5px dashed #aaa;

	margin-bottom: 25px;
}

.upload-text {
	color: #888;
}

.table {
	text-align: left;
}

.bucket-actions {
	text-align: right;
	margin-bottom: 25px;
}
</style>

<template>
<div class="home">
	<div v-cloak @drop.prevent="addFile" @dragover.prevent class="upload-area">
		Drag and drop files here
	</div>

	<div class="bucket-actions">
		<button v-on:click="directoryInput = ''" class="btn btn-warning">
			<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-folder" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				<path d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z" />
				<path fill-rule="evenodd"
				 d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z" />
			</svg>

			Make Directory
		</button>
	</div>

	<table class="table">
		<thead>
			<tr>
				<th scope="col">File</th>
				<th scope="col">Size</th>
				<th scope="col">Upload Date</th>
				<th scope="col">Actions</th>
			</tr>
		</thead>
		<tbody>
			<tr v-if="directoryInput !== null">
				<td><input type="text" v-model="directoryInput" v-on:keydown.enter="createDirectory"></td>
			</tr>

			<tr v-for="file in filesUploading">
				<td class="upload-text">
					<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-earmark" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
						<path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z" />
					</svg>
					{{file.Key}}
				</td>
				<td></td>
				<td></td>
				<td>
					<div class="spinner-border" role="status">
						<span class="sr-only">Loading...</span>
					</div>
				</td>
			</tr>


			<tr v-for="file in files">
				<td>
					<svg v-if="file._type === 'file'" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-earmark" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
						<path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z" />
					</svg>

					<svg v-if="file._type === 'folder'" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-folder" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z" />
						<path fill-rule="evenodd"
						 d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z" />
					</svg>

					{{file.Key}}
				</td>
				<td>{{file.Size | prettyBytes}}</td>
				<td>{{file.LastModified.toLocaleString()}}</td>
				<td><button v-on:click="downloadFile(file)" class="btn btn-primary">Download</button></td>
			</tr>
		</tbody>
	</table>
</div>
</template>

<script>
import prettyBytes from 'pretty-bytes';
import s3Credentials from '../../.s3-credentials.js';

const s3 = new AWS.S3(s3Credentials);
const Bucket = 'caleb';

async function getNewKey(Key) {
	try {
		await s3.headObject({
			Bucket,
			Key
		}).promise();
	} catch (err) {
		if (err.code !== "NotFound") {
			throw new Error(err.code);
		}

		return Key;
	}

	const parts = Key.split('.');
	const ext = parts.pop();
	const base = parts.join('.');

	for (let i = 1;; i++) {
		const newKey = `${base}(${i}).${ext}`;

		try {
			await s3.headObject({
				Bucket,
				Key: newKey
			}).promise();
		} catch (err) {
			if (err.code !== "NotFound") {
				throw new Error(err.code);
			}

			return newKey;
		}
	}

}

export default {
	name: 'Home',
	data: () => ({
		files: [],
		filesUploading: [],
		directoryInput: null
	}),
	methods: {
		async addFile(e) {
			await Promise.all([...e.dataTransfer.files].map(async file => {
				const Key = await getNewKey(file.name);

				const params = {
					Bucket,
					Key,
					Body: file
				};

				const tempFile = {
					Key
				};

				this.filesUploading.push(tempFile);

				s3.putObject(params, (err, data) => {
					if (err)
						console.log(err)
					else
						console.log("Successfully uploaded data");

					this.listFiles(() => {
						this.filesUploading.splice(this.filesUploading.indexOf(tempFile), 1);
					});
				});
			}));
		},

		downloadFile(file) {
			s3.getObject({
				Bucket,
				Key: file.Key
			}, (err, data) => {
				console.log(data);
				const blob = new Blob([data.Body], {
					type: data.ContentType
				});

				const downloadURL = function(data, fileName) {
					var a;
					a = document.createElement('a');
					a.href = data;
					a.download = fileName;
					document.body.appendChild(a);
					a.style = 'display: none';
					a.click();
					a.remove();
				};

				const url = window.URL.createObjectURL(blob);
				downloadURL(url, file.Key);
				setTimeout(function() {
					return window.URL.revokeObjectURL(url);
				}, 0);
			})
		},

		listFiles(cb = () => {}) {
			s3.listObjects({
				Bucket: 'caleb',
			}, (err, list) => {
				const set = new Set();

				this.files = list.Contents
					.sort((a, b) => a.LastModified > b.LastModified ? -1 : 1)
					.map(file => ({
						...file,
						...{
							Key: file.Key.split('/')[0],
							_type: file.Key.split('/').length === 1 ? 'file' : 'folder'
						}
					}))
					.filter(({
						Key
					}) => {
						if (set.has(Key)) {
							return false;
						} else {
							set.add(Key);
							return true;
						}
					});

				cb();
			});
		},

		async createDirectory() {
			await s3.putObject({
				Key: this.directoryInput + '/.vortex-folder',
				Bucket
			}).promise();

			this.directoryInput = null;
			await this.listFiles();
		}
	},
	filters: {
		prettyBytes
	},
	created() {
		this.listFiles();
	}
}
</script>
