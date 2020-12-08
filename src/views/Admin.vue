<style>
h1,
h2,
h3,
h4,
h5,
h6 {
	font-family: Poppins;
	font-weight: bold;
}

p,
span,
a {
	line-height: 1.5;
}

.email {
	width: 100%;
	height: 48px;
	border: 1px solid rgba(56, 75, 101, 0.4);
	box-sizing: border-box;
	border-radius: 6px;
	font-family: Inter;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	color: rgba(27, 37, 51, 0.8);
	padding: 10px 15px;
	margin-bottom: 16px;
}

::-webkit-input-placeholder {
	/* WebKit, Blink, Edge */
	color: #AFB7C1;
}

:-moz-placeholder {
	/* Mozilla Firefox 4 to 18 */
	color: #AFB7C1;
	opacity: 1;
}

::-moz-placeholder {
	/* Mozilla Firefox 19+ */
	color: #AFB7C1;
	opacity: 1;
}

:-ms-input-placeholder {
	/* Internet Explorer 10-11 */
	color: #AFB7C1;
}

::-ms-input-placeholder {
	/* Microsoft Edge */
	color: #AFB7C1;
}

::placeholder {
	/* Most modern browsers support this now. */
	color: #AFB7C1;
}

.video {
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
	border: 1px solid #adb4be;
	border-radius: 6px;
}

input {
	height: 48px;
	font-size: 16px;
	padding: 10px 15px;
	border: 1px solid #adb4be;
	color: #474e59;
	border-radius: 6px;
	cursor: text;
}

.button {
	padding: 14px 0;
	background-color: #0068DC;
	border-radius: 6px;
	font-weight: bold;
	font-size: 16px;
	line-height: 19px;
	text-align: center;
	text-decoration: none;
	color: #FFFFFF;
	margin-bottom: 16px;
	transition: all 100ms ease-in-out;
}

.button-no-bg {
	padding: 14px 0;
	border-radius: 6px;
	font-weight: bold;
	font-size: 16px;
	line-height: 19px;
	text-align: center;
	text-decoration: none;
	color: #FFFFFF;
	margin-bottom: 16px;
	transition: all 100ms ease-in-out;
}

.button:hover {
	background: #0059d0;
}

.custom-select {
	width: 100%;
	height: 48px;
	border: 1px solid rgba(56, 75, 101, 0.4);
	box-sizing: border-box;
	border-radius: 6px;
	font-family: Inter;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	color: rgba(27, 37, 51, 0.8);
	padding: 10px 15px;
	margin-bottom: 16px;
}

.how {
	background: #fff;
	padding: 40px 0;
	margin-top: 40px;
}

.keys .title {
	font-weight: bold;
	font-size: 29px;
	line-height: 43px;
	text-align: center;
	color: #252525;
}

.keys .label {
	font-weight: bold;
	font-size: 16px;
	color: #354049;
}

.keys .copy {
	background: #FFFFFF;
	border: 1px solid #0068DC;
	border-radius: 4px;
	font-weight: bold;
	font-size: 14px;
	text-align: center;
	color: #0068DC;
	cursor: pointer;
	position: absolute;
	bottom: 8px;
	right: 26px;
	padding: 4px 14px;
	line-height: 1.6;
	transition: all 100ms ease-in-out;
}

.keys .copy:hover {
	background: #0068DC;
	color: #fff;
}

.keys a {
	font-weight: bold;
}

.keys input {
	height: 48px;
	font-size: 16px;
	padding: 10px 15px;
	border: 1px solid #adb4be;
	color: #474e59;
	border-radius: 6px;
	cursor: text;
}

.keys .alert-warning {
	color: #000;
	background-color: #fff9f6;
	border-color: #f9a482;
}

.user-row {
	padding-bottom: -25px;
}

.search {
	margin-bottom: 25px;
}

.center {
	text-align: center;
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

						<input v-model="search" placeholder="Search by email..." class="search">

						<pre v-if="userJson">{{userJson}}</pre>

						<table class="table">
							<thead>
								<tr>
									<th>ID</th>
									<th>Email</th>
									<th>createTime</th>
									<th>lastLoginTime</th>
									<th>storage</th>
									<th>bandwidth</th>
									<th>info</th>
								</tr>
							</thead>

							<tbody>
								<tr v-for="user in users" class="user-row">
									<td>
										<p style="font-size: 12px;">{{user.id}}</p>
									</td>
									<td>{{user.email}}

										<svg v-if="user.activated === true" width="1em" height="1em" viewBox="0 0 16 16" class="text-success bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" />
										</svg>

										<svg v-else width="1em" height="1em" viewBox="0 0 16 16" class="text-danger bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd"
											 d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
										</svg>

									</td>
									<td>{{user.createTime | toNiceDate}}</td>
									<td>{{user.lastLoginTime | toNiceDate}}</td>
									<td>{{user.filesUsed}} files, {{user.bytesUsed | prettyBytes}}</td>
									<td>{{user.filesDownloaded}} files, {{user.bytesDownloaded | prettyBytes}}</td>
									<td><button v-on:click="getInfo(user)" class="btn btn-outline-info">Info</button></td>
								</tr>
							</tbody>
						</table>

						<p>Found {{results}} results.</p>

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
		userJson: null
	}),
	filters: {
		toNiceDate(d) {
			return moment(d).format('L HH:MM');
		},
		prettyBytes
	},
	methods: {
		async getUsers() {
			const {
				data: {
					users,
					results
				}
			} = await axios.post('/api/admin/users', {
				search: this.search
			});

			this.users = users;
			this.results = results;
		},

		async getInfo(user) {
			const {data} = await axios.get(`/api/admin/json/${user.id}`);

			data.Events = {
				...data.Events,
				bytesUploaded: prettyBytes(data.Events.bytesUploaded),
				bytesDeleted: prettyBytes(data.Events.bytesDeleted),
				bytesDownloaded: prettyBytes(data.Events.bytesDownloaded)
			};

			this.userJson = data;
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
