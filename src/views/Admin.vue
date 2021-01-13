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
										<th scope="col" class="pl-4">Email</th>
										<th scope="col">Created</th>
										<th scope="col">Last Login</th>
										<th scope="col">Storage</th>
										<th scope="col">Bandwidth</th>
										<th scope="col">Info</th>
										<th scope="col">Plan</th>
									</tr>
								</thead>

								<tbody>
									<tr v-for="user in users" class="user-row">
										<th scope="row" class="align-middle">
											<p class="text-small pr-2 mb-0 text-right">{{user.id}}</p>
										</th>
										<td class="align-middle">

											<svg v-if="user.activated === true" width="1.4em" height="1.4em" viewBox="0 0 16 16" class="text-success bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
												<title>Activated</title>
												<path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" />
											</svg>

											<svg v-else width="1.4em" height="1.4em" viewBox="0 0 16 16" class="text-danger bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
												<title>Not Activated</title>
												<path fill-rule="evenodd"
												 d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
											</svg>

											{{user.email}}

										</td>
										<td class="align-middle">{{user.createTime | toNiceDate}}</td>
										<td class="align-middle">{{user.lastLoginTime | toNiceDate}}</td>
										<td class="align-middle">{{user.filesUsed}} files, {{user.bytesUsed | prettyBytes}}</td>
										<td class="align-middle">{{user.bytesDownloaded | prettyBytes}}</td>
										<td class="align-middle"><button v-on:click="getInfo(user)" class="btn btn-outline-secondary">Info</button></td>
										<td class="align-middle pr-2">
											<select class="custom-select plan-select mb-0" v-on:change="setPlan(user, $event.target.value)">
												<option v-for="(plan, planId) in plans" v-bind:selected="user.planId === planId">
													{{planId}}
												</option>
											</select>
										</td>
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
