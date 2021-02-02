<style media="screen" scoped>
	.plan-table {
		border-collapse: separate;
		border-spacing: 0 10px;
	}
	.plan-table th {
		border-top: 0;
		border-bottom: 1px solid #dee2e6;
		color: #768394;
		font-size: 14px;
	}
	.plan-table td {
		height: 80px;
		border: 0;
	}
	.plan-row {
		padding: 10px;
	}
	.plan-selected {
		color: #fff;
		background: #0059D0;
		border-radius: 10px;
	}
	.plan-selected td {
		border: solid 1px #0059D0;
		border-style: solid none;
		padding: 10px;
	}
	.plan-selected td:first-child {
		border-left-style: solid;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
	}
	.plan-selected td:last-child {
		border-right-style: solid;
		border-bottom-right-radius: 10px;
		border-top-right-radius: 10px;
	}
	.plan-name {
		font-weight: bold;
	}
	.btn-upgrade {
		background: #EFF1F3;
		color: #0068D0;
		min-width: 164px;
	}
</style>
<template>
	<div class="bars" v-if="usage != null">

		<div class="row mb-4">
			<div class="col">
				<h5 class="mb-4">Usage</h5>
				<hr>
			</div>
		</div>

		<div class="row mb-4">

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

		<div class="row">
			<div class="col">
				<h5 class="mt-5 mb-3">Plan Details</h5>
			</div>
		</div>

		<div class="row">
			<div class="col">
				<table class="table plan-table">
					<thead>
						<tr>
							<th scope="col"></th>
							<th scope="col" class="w-25">Plan</th>
							<th scope="col">Storage</th>
							<th scope="col">Bandwidth</th>
							<th scope="col">File Limit</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						<tr class="plan-row plan-selected">
							<td class="text-right"><img src="@/assets/checkmark.svg" alt="Checkmark" width="14"></td>
							<td class="plan-name w-25">Starter</td>
							<td>1 GB</td>
							<td>1 GB</td>
							<td>1,000</td>
							<td></td>
						</tr>
						<tr class="plan-row">
							<td class="text-right"><img src="@/assets/checkmark.svg" alt="Checkmark" width="14"></td>
							<td class="plan-name w-25">Basic</td>
							<td>100 GB</td>
							<td>100 GB</td>
							<td>100,000</td>
							<td class="text-right"><a href="#" class="btn btn-sm btn-upgrade">Verify Email</a></td>
						</tr>
						<tr class="plan-row">
							<td class="text-right"><img src="@/assets/checkmark.svg" alt="Checkmark" width="14"></td>
							<td class="plan-name w-25">Pro</td>
							<td>1 TB</td>
							<td>1 TB</td>
							<td>1,000,000</td>
							<td class="text-right"><a href="#" class="btn btn-sm btn-upgrade">Upgrade - Free!</a></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="row">
			<div class="col">
				<p class="text-center mt-4">Need more? <a href="#" class="font-weight-bold">Contact Us</a></p>
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
	methods: {
		async updateUsage() {
			const {
				data
			} = await axios.post('/api/usage');

			this.usage = data;
		}
	},
	computed: {
		usage() {
			return this.$store.state.usage;
		},
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
		this.$store.dispatch('getUsage');
	}
};
</script>
