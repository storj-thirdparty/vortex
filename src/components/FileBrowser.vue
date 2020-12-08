<style scoped>
.card {
	min-height: 500px;
}

.table-heading {
	color: #768394;
	border-top: 0;
	border-bottom: 1px solid #dee2e6;
	padding-left: 0;
}

.path {
	font-size: 18px;
	font-weight: 700;
}

.bars {
	margin-bottom: 2rem;
}

.upload-help {
	font-size: 1.75rem;
	text-align: center;

	margin-top: 2rem;
	color: #777;
}

.metric {
	color: #444;
}
</style>

<template>
<div class="card border-0 p-4 p-lg-5 mb-5 mt-4" @drop.prevent="upload" @dragover.prevent>

	<div class="row bars" v-if="usage != null">
		<div class="col-sm-4">
			<p><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-hdd" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" d="M14 9H2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1zM2 8a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H2z" />
					<path d="M5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
					<path fill-rule="evenodd"
					 d="M4.094 4a.5.5 0 0 0-.44.26l-2.47 4.532A1.5 1.5 0 0 0 1 9.51v.99H0v-.99c0-.418.105-.83.305-1.197l2.472-4.531A1.5 1.5 0 0 1 4.094 3h7.812a1.5 1.5 0 0 1 1.317.782l2.472 4.53c.2.368.305.78.305 1.198v.99h-1v-.99a1.5 1.5 0 0 0-.183-.718L12.345 4.26a.5.5 0 0 0-.439-.26H4.094z" />
				</svg> Storage - <span class="metric">{{usage.bytesUploaded | prettyBytes}}/{{this.usage.bytesUploadedQuota | prettyBytes}}</span></p>
			<div class="progress">
				<div class="progress-bar" role="progressbar" v-bind:style="`width: ${bytesUploadedPercent}%;`"></div>
			</div>
		</div>

		<div class="col-sm-4">
			<p><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-files" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" d="M4 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z" />
					<path d="M6 0h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1H4a2 2 0 0 1 2-2z" />
				</svg> Files - <span class="metric">{{usage.filesUploaded}}/{{usage.filesUploadedQuota}}</span></p>

			<div class="progress">
				<div class="progress-bar" role="progressbar" v-bind:style="`width: ${filesUploadedPercent}%;`"></div>
			</div>
		</div>

		<div class="col-sm-4">
			<p><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd"
					 d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z" />
				</svg> Bandwidth - <span class="metric">{{usage.bytesDownloaded | prettyBytes}}/{{usage.bytesDownloadedQuota | prettyBytes}}</span></p>

			<div class="progress">
				<div class="progress-bar" role="progressbar" v-bind:style="`width: ${bytesDownloadedPercent}%;`"></div>
			</div>
		</div>
	</div>

	<!--<p class="path mb-4">{{path}}</p>-->

	<table class="table">
		<thead>
			<tr>
				<th class="table-heading" scope="col">File</th>
				<th class="table-heading" scope="col">Size</th>
				<th class="table-heading" scope="col">Upload Date</th>
				<th class="table-heading" scope="col">Actions</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="file in filesUploading" scope="row">
				<td class="upload-text">{{file.Key}}</td>
				<td></td>
				<td></td>
				<td>
					<div class="spinner-border" role="status">
						<span class="sr-only">Loading...</span>
					</div>
				</td>
			</tr>

			<file-entry v-for="file in files" v-bind:file="file" v-on:download="download(file)" v-on:delete="del(file)"></file-entry>
		</tbody>
	</table>

	<p v-if="!files.length" class="upload-help">
		<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cloud-upload" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd"
			 d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
			<path fill-rule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
		</svg>
		Drag and drop files here
	</p>
</div>
</template>

<script>
import axios from 'axios';
import prettyBytes from 'pretty-bytes';

import FileEntry from './FileEntry.vue';

export default {
	data: () => ({
		s3: null,
		path: '/',
		filesUploading: [],
		files: [],
		usage: null
	}),
	async created() {
		const s3Config = {
			accessKeyId: this.$store.state.stargateAccessKey,
			secretAccessKey: this.$store.state.stargateSecretKey,
			endpoint: this.$store.state.stargateEndpoint,
			s3ForcePathStyle: true,
			signatureVersion: 'v4'
		};

		console.log(s3Config);

		this.s3 = new AWS.S3(s3Config);

		await this.list();
		await this.updateUsage();
	},
	methods: {
		async upload(e) {
			let files = e.dataTransfer.files;

			await [...files].map(async file => {
				const params = {
					Bucket: this.$store.state.stargateBucket,
					Key: file.name,
					Body: file
				};

				this.filesUploading.push(params);

				await this.s3.putObject(params).promise();
				await this.list();

				this.filesUploading.splice(this.filesUploading.indexOf(params), 1);

				await axios.post('/api/events/upload', {
					bytes: file.size,
					files: 1
				});

				await this.updateUsage();
			})

		},

		async download(file) {
			console.log(file);

			const url = this.s3.getSignedUrl('getObject', {
				Bucket: this.$store.state.stargateBucket,
				Key: file.Key
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

			downloadURL(url);

			await axios.post('/api/events/download', {
				bytes: file.Size,
				files: 1
			});

			await this.updateUsage();
		},

		async del(file) {
			await this.$store.state.s3.deleteObject({
				Bucket: this.$store.state.stargateBucket,
				Key: file.Key
			}).promise();

			console.log('del', { file });

			await axios.post('/api/events/delete', {
				bytes: file.Size,
				files: 1
			});

			await this.list();
			await this.updateUsage();
		},

		async list() {
			const {
				Contents
			} = await this.s3.listObjects({
				Bucket: this.$store.state.stargateBucket
			}).promise();

			Contents.sort((a, b) => a.LastModified < b.LastModified ? -1 : -1);

			this.files = Contents;
		},

		async updateUsage() {
			const {
				data
			} = await axios.post('/api/usage');

			this.usage = data;
		}
	},
	computed: {
		bytesUploadedPercent() {
			return this.usage !== null ? (this.usage.bytesUploaded / this.usage.bytesUploadedQuota * 100).toFixed(2) : 0;
		},

		filesUploadedPercent() {
			return this.usage !== null ? (this.usage.filesUploaded / this.usage.filesUploadedQuota * 100).toFixed(2) : 0;
		},

		bytesDownloadedPercent() {
			return this.usage !== null ? (this.usage.bytesDownloaded / this.usage.bytesDownloadedQuota * 100).toFixed(2) : 0;
		}
	},
	filters: {
		prettyBytes,
	},
	components: {
		FileEntry
	}
}
</script>
