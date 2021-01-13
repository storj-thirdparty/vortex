<style media="screen">
	.plan-select {
		height: auto;
		padding: 6px 12px;
		cursor: pointer;
		min-width: 120px;
	}
	.table td, .table th {
	    padding-left: 8px;
	    padding-right: 8px;
	    white-space: nowrap;
	}
</style>

<template>
<div>
	<div>

		<div class="container">

			<div class="row">
				<div class="col-sm-12">

					<div class="card border-0 p-4 p-lg-5 mb-5 mt-4" @drop.prevent="upload" @dragover.prevent>
						<h1 class="path mb-4">Admin Console</h1>

						<input type="text" v-model="search" placeholder="Search by email..." class="mb-4">

						<pre v-if="userJson">{{userJson}}</pre>

						<div class="table-responsive">
							<table class="table table-striped table-hover">
								<thead>
									<tr>
										<th scope="col" class="pl-2 text-center">ID</th>
										<th scope="col">
											<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-ui-checks" viewBox="0 0 16 16">
												<title>Check if email is activated</title>
											  <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708l-2 2zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708l-2 2zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
											</svg>
										</th>
										<th scope="col">Email</th>
										<th scope="col">Created</th>
										<th scope="col">Last Login</th>
										<th scope="col">Storage</th>
										<th scope="col">Bandwidth</th>
										<th scope="col">Plan</th>
										<th scope="col">Info</th>
									</tr>
								</thead>

								<tbody>
									<tr v-for="user in users" class="user-row">
										<th scope="row" class="align-middle">
											<p class="text-small pr-2 mb-0 text-right">{{user.id}}</p>
										</th>
										<td class="align-middle">

											<svg v-if="user.activated === true" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
												<title>Activated</title>
											  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
											  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
											</svg>

											<svg v-else xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
												<title>Not Activated</title>
											  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
											  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
											</svg>

										</td>
										<td class="align-middle">{{user.email}}</td>
										<td class="align-middle">{{user.createTime | toNiceDate}}</td>
										<td class="align-middle">{{user.lastLoginTime | toNiceDate}}</td>
										<td class="align-middle">{{user.filesUsed}} files, {{user.bytesUsed | prettyBytes}}</td>
										<td class="align-middle">{{user.bytesDownloaded | prettyBytes}}</td>
										<td class="align-middle pr-2">
											<select class="custom-select plan-select mb-0" v-on:change="setPlan(user, $event.target.value)">
												<option v-for="(plan, planId) in plans" v-bind:selected="user.planId === planId">
													{{planId}}
												</option>
											</select>
										</td>
										<td class="align-middle"><button v-on:click="getInfo(user)" class="btn btn-outline-secondary">+</button></td>
									</tr>
								</tbody>
							</table>
						</div>

						<p class="mt-2">Found {{results}} results.</p>

						<!--<nav aria-label="Page navigation example">
							<ul class="pagination justify-content-center">
								<li class="page-item disabled">
									<a class="page-link" href="#" tabindex="-1">Previous</a>
								</li>
								<li class="page-item"><a class="page-link" href="#">1</a></li>
								<li class="page-item"><a class="page-link" href="#">2</a></li>
								<li class="page-item"><a class="page-link" href="#">3</a></li>
								<li class="page-item">
									<a class="page-link" href="#">Next</a>
								</li>
							</ul>
						</nav>-->
					</div>

				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';
import wasm from '../wasm.js';
import moment from 'moment';
import prettyBytes from 'pretty-bytes';

import Hero from '../components/Hero.vue';
import FileBrowser from '../components/FileBrowser.vue';

let s3;

const Bucket = 'web';


export default {
	name: 'Home',
	data: () => ({
		users: [],
		search: '',
		results: 0,
		userJson: null,
		plans: []
	}),
	filters: {
		toNiceDate(d) {
			return moment(d).format('M/D/YY');
		},
		prettyBytes
	},
	methods: {
		async getUsers() {
			const {
				data: {
					users,
					plans,
					results
				}
			} = await axios.post('/api/admin/users', {
				search: this.search
			});

			this.users = users;
			this.plans = plans;
			this.results = results;
		},

		async getInfo(user) {
			const {
				data
			} = await axios.get(`/api/admin/json/${user.id}`);

			data.Events = {
				...data.Events,
				bytesUploaded: prettyBytes(data.Events.bytesUploaded),
				bytesDeleted: prettyBytes(data.Events.bytesDeleted),
				bytesDownloaded: prettyBytes(data.Events.bytesDownloaded)
			};

			for(const key of [
				'lastAuditUpload',
				'lastAuditDownload',
				'storageSum'
			]) {
				if(typeof data.Events[key] === 'number') {
						data.Events[key] = prettyBytes(data.Events[key]);
				}
			}

			this.userJson = data;
		},

		async setPlan(user, planId) {
			console.log({ user, planId });

			await axios.post(`/api/admin/setplan`, {
				userId: user.id,
				planId
			})
		}
	},
	watch: {
		async search() {
			await this.getUsers();
		}
	},
	async created() {
		await this.getUsers();
	}
}
</script>
