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
	<file-browser></file-browser>
</div>
</template>

<script>
import prettyBytes from 'pretty-bytes';
import s3Credentials from '../../.s3-credentials.js';

import FileBrowser from '../components/file-browser.vue';

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

				const files = list.Contents
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

				for (const file of files) {
					this.fbFiles[file.Key] = file;
				}

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
	},
	components: {
		FileBrowser
	}
}
</script>
