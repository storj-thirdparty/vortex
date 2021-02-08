<style scoped>
.file-browser {
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

.upload-help {
	font-size: 1.75rem;
	text-align: center;
	margin-top: 1.5rem;
	color: #93a1ae;
	border: 2px dashed #bec4cd;
	border-radius: 10px;
	padding: 80px 20px;
	background: #fafafb;
}

.metric {
	color: #444;
}
.div-responsive {
	min-height: 400px;
}
</style>

<template>
<div class="row">
	<div class="col-sm-12">
		<div class="card border-0 p-4 p-lg-5 mb-5" style="border-top-left-radius: 0;">
			<div class="div-responsive" v-cloak @drop.prevent="upload" @dragover.prevent>
				<!--<p class="path mb-4">{{path}}</p>-->

				<div class="row mb-2">

					<div class="col-sm-12 col-md-4 col-xl-8 mb-3">
						<h2>My Files</h2>
					</div>

					<div class="col-sm-12 col-md-4 col-xl-2 mb-3">
						<input ref="fileInput" type="file" hidden multiple v-on:change="upload">
						<button class="btn btn-primary btn-block" v-on:click="buttonUpload">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-upload mr-2" viewBox="0 0 16 16">
								<path fill-rule="evenodd"
								d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
								<path fill-rule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
							</svg>
							Upload File
						</button>
					</div>

					<div class="col-sm-12 col-md-4 col-xl-2 mb-3">
						<button class="btn btn-light btn-block" v-on:click="createFolderInputShow = !createFolderInputShow" style="margin-right: 15px">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-plus mr-2" viewBox="0 0 16 16">
								<path fill-rule="evenodd"
								d="M9.828 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91H9v1H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0 0 13.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 0 1 1-.98h3.672a1 1 0 0 1 .707.293z" />
								<path fill-rule="evenodd" d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" />
							</svg>
							New Folder
						</button>
					</div>

				</div>

				<div>
					<table class="table table-hover">
						<thead>
							<tr>
								<th class="table-heading" scope="col">Name</th>
								<th class="table-heading" scope="col">Size</th>
								<th class="table-heading" scope="col">Upload Date</th>
								<th class="table-heading" scope="col"></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="file in filesUploading" scope="row">
								<td class="upload-text">
									<span>
									<svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="bi bi-file-earmark ml-2 mr-1"><path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"></path><path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z"></path></svg>
									{{filename(file)}}
									</span>
								</td>
								<td></td>
								<td></td>
								<td>
									<div class="spinner-border" role="status">
										<span class="sr-only">Loading...</span>
									</div>
								</td>
							</tr>

							<tr v-if="path.length > 0">
								<td><a href="javascript:null" v-on:click="back">...</a></td>
							</tr>

							<tr v-if="createFolderInputShow === true">
								<td span="3">
									<input class="form-control" type="text" placeholder="Name of the folder" v-model="createFolderInput" v-on:keypress.enter="createFolder">
								</td>
								<td span="3">
								</td>
								<td span="3">
									<button v-on:click="createFolder" v-bind:disabled="!createFolderEnabled" class="btn btn-primary">Save Folder</button>
								</td>
							</tr>


							<file-entry v-for="file in files.filter(f => f.type === 'folder')" v-bind:path="path" v-bind:file="file" v-on:download="download(file)" v-on:delete="del(file)" v-on:go="go" v-bind:key="file.Key"></file-entry>

							<file-entry v-for="file in files.filter(f => f.type === 'file')" v-bind:path="path" v-bind:file="file" v-on:download="download(file)" v-on:delete="del(file)" v-on:go="go" v-bind:key="file.Key"></file-entry>
						</tbody>
					</table>
				</div>

				<div v-if="!files.length" class="upload-help">
					<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.8616 1.02072L16.8554 1.01398L5.40027 13.3834L7.94585 16.1322L16.2 7.2192V26.2817H19.8V7.64972L27.6554 16.1321L30.201 13.3833L17.8069 0L16.8616 1.02072Z" fill="#93A1AF" />
						<path d="M36 32.1127H0V36H36V32.1127Z" fill="#93A1AF" />
					</svg>
					<h4 class="mt-4">Drop Files Here to Upload</h4>
				</div>

			</div>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';
import prettyBytes from 'pretty-bytes';
import {
	toHumanString
} from 'human-readable-numbers';

import FileEntry from './FileEntry.vue';

export default {
	data: () => ({
		s3: null,
		filesUploading: [],
		createFolderInput: '',
		createFolderInputShow: false
	}),
	computed: {
		createFolderEnabled() {
			return this.createFolderInput.length > 0 && this.files.filter(file => file.Key === this.createFolderInput).length === 0;
		},
		path() {
			return this.$store.state.files.path;
		},
		files() {
			return this.$store.state.files.files;
		}
	},
	async created() {
		const s3Config = {
			accessKeyId: this.$store.state.stargateAccessKey,
			secretAccessKey: this.$store.state.stargateSecretKey,
			endpoint: this.$store.state.stargateEndpoint,
			s3ForcePathStyle: true,
			signatureVersion: 'v4'
		};

		this.s3 = new AWS.S3(s3Config);

		await this.list();
	},
	methods: {
		filename(file) {
			return file.Key.length > 25 ? file.Key.slice(0, 25) + '...' : file.Key;
		},
		async upload(e) {
			console.log(e);

			let files = e.dataTransfer ? e.dataTransfer.files : e.target.files;

			console.log(e);

			await Promise.all([...files].map(async file => {
				const params = {
					Bucket: this.$store.state.stargateBucket,
					Key: this.path + file.name,
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
			}));

		},

		async download(file) {
			const url = this.s3.getSignedUrl('getObject', {
				Bucket: this.$store.state.stargateBucket,
				Key: this.path + file.Key
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

		async del(file) {
			await this.$store.state.s3.deleteObject({
				Bucket: this.$store.state.stargateBucket,
				Key: this.path + file.Key
			}).promise();

			await axios.post('/api/events/delete', {
				bytes: file.Size,
				files: 1
			});

			await this.list();
		},

		async list(path) {
			this.$store.dispatch('files/list', path, {
				root: true
			});
		},

		async go(path) {
			this.$store.dispatch('openDropdown', null);
			await this.list(this.path + path);
		},

		async back() {
			this.$store.dispatch('openDropdown', null);
			this.$store.dispatch('files/back');
		},

		async buttonUpload() {
			let fileInputElement = this.$refs.fileInput;
			fileInputElement.click();
		},

		async createFolder() {
			this.$store.dispatch('files/createFolder', this.createFolderInput);

			this.createFolderInput = '';
			this.createFolderInputShow = false;
		}
	},
	components: {
		FileEntry
	}
}
</script>
