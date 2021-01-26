<template>
	<div class="row bars" v-if="usage != null">

		<div class="col-sm-12 col-md-4 mb-4 mb-md-0">
			<p class="text-small">
				<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-hdd mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" d="M14 9H2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1zM2 8a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H2z" />
					<path d="M5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
					<path fill-rule="evenodd"
					 d="M4.094 4a.5.5 0 0 0-.44.26l-2.47 4.532A1.5 1.5 0 0 0 1 9.51v.99H0v-.99c0-.418.105-.83.305-1.197l2.472-4.531A1.5 1.5 0 0 1 4.094 3h7.812a1.5 1.5 0 0 1 1.317.782l2.472 4.53c.2.368.305.78.305 1.198v.99h-1v-.99a1.5 1.5 0 0 0-.183-.718L12.345 4.26a.5.5 0 0 0-.439-.26H4.094z" />
				</svg> <strong>Storage</strong> - <span class="metric">{{usage.bytesUploaded | prettyBytes}}/{{this.usage.bytesUploadedQuota | prettyBytes}}</span>
			</p>
			<div class="progress">
				<div class="progress-bar" role="progressbar" v-bind:style="`width: ${bytesUploadedPercent}%;`"></div>
			</div>
		</div>

		<div class="col-sm-12 col-md-4 mb-4 mb-md-0">
			<p class="text-small">
				<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-files mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" d="M4 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z" />
					<path d="M6 0h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1H4a2 2 0 0 1 2-2z" />
				</svg> <strong>Files</strong> - <span class="metric">{{usage.filesUploaded | toHumanString}}/{{usage.filesUploadedQuota | toHumanString}}</span>
			</p>

			<div class="progress">
				<div class="progress-bar" role="progressbar" v-bind:style="`width: ${filesUploadedPercent}%;`"></div>
			</div>
		</div>

		<div class="col-sm-12 col-md-4 mb-4 mb-md-0">
			<p class="text-small">
				<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down-up mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd"
					 d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z" />
				</svg> <strong>Bandwidth</strong> - <span class="metric">{{usage.bytesDownloaded | prettyBytes}}/{{usage.bytesDownloadedQuota | prettyBytes}}</span>
			</p>

			<div class="progress">
				<div class="progress-bar" role="progressbar" v-bind:style="`width: ${bytesDownloadedPercent}%;`"></div>
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

export default {
	data: () => ({
		usage: null
	}),
	methods: {
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
		toHumanString,
		prettyBytes
	},
	async created() {
		await this.updateUsage();
	}
};
</script>
