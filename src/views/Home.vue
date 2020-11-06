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
</style>

<template>
<div class="home">
	<div v-cloak @drop.prevent="addFile" @dragover.prevent class="upload-area">
		Drag and drop files here
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
			<tr v-for="file in filesUploading">
				<td class="upload-text">{{file.Key}}</td>
				<td></td>
				<td></td>
				<td>
					<div class="spinner-border" role="status">
						<span class="sr-only">Loading...</span>
					</div>
				</td>
			</tr>
			<tr v-for="file in files">
				<td>{{file.Key}}</td>
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
	} catch(err) {
		if(err.code !== "NotFound") {
			throw new Error(err.code);
		}

		return Key;
	}

	const parts = Key.split('.');
	const ext = parts.pop();
	const base = parts.join('.');

	for(let i = 1; ; i++) {
		const newKey = `${base}(${i}).${ext}`;

		try {
			await s3.headObject({
				Bucket,
				Key: newKey
			}).promise();
		} catch(err) {
			if(err.code !== "NotFound") {
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
		filesUploading: []
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
				this.files = list.Contents.sort((a, b) => {
					return a.LastModified > b.LastModified ? -1 : 1;
				});

				cb();
			});

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
