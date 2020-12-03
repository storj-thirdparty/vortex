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

</style>

<template>
	<div class="card border-0 p-4 p-lg-5 mb-5 mt-4"  @drop.prevent="upload" @dragover.prevent>
		<p class="path mb-4">{{path}}</p>

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

				<tr v-for="file in files" scope="row">
					<td>{{file.Key}}</td>
					<td>{{file.Size | prettyBytes}}</td>
					<td>{{file.LastModified.toLocaleString()}}</td>
					<td><button v-on:click="download(file)" class="btn btn-sm btn-outline-primary">Download</button></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import axios from 'axios';
const prettyBytes = require('pretty-bytes');

export default {
	data: () => ({
		s3: null,
		path: '/',
		filesUploading: [],
		files: []
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

				console.log('events');

				await axios.post('/api/events/upload', {
					bytes: file.size,
					files: 1
				});
			})

		},

		async download(file) {
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
		},

		async list() {
			const { Contents } = await this.s3.listObjects({
				Bucket: this.$store.state.stargateBucket
			}).promise();

			Contents.sort((a, b) => a.LastModified < b.LastModified ? -1 : -1);

			this.files = Contents;
		}
	},
	filters: {
		prettyBytes
	}
}
</script>
