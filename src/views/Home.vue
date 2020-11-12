<style>
	h1,h2,h3,h4,h5,h6 {
		font-weight: bold;
	}
	p, span, a {
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

	::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:    #AFB7C1;
	}
	:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
	   color:    #AFB7C1;
	   opacity:  1;
	}
	::-moz-placeholder { /* Mozilla Firefox 19+ */
	   color:    #AFB7C1;
	   opacity:  1;
	}
	:-ms-input-placeholder { /* Internet Explorer 10-11 */
	   color:    #AFB7C1;
	}
	::-ms-input-placeholder { /* Microsoft Edge */
	   color:    #AFB7C1;
	}
	::placeholder { /* Most modern browsers support this now. */
	   color:    #AFB7C1;
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
		background: #0068DC;
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

	.card {
		box-shadow: 0 0 30px #e5e5e5;
	}
	.how {
		background: #fff;
		padding: 40px 0;
		margin-top: 40px;
	}
</style>

<template>
<<<<<<< HEAD

		<div v-if="!apiKey">

			<div class="container">
				<div class="row">
					<div class="col-sm-12 col-md-6 col-lg-5 py-5 mt-0 mt-lg-5">
						<Hero></Hero>
					</div>

					<div class="col-sm-12 col-md-6 col-lg-6 offset-lg-1">
						<div class="card border-0 p-4 p-lg-5 mb-5 mt-4">

							<h5 class="mb-4">Try Tardigrade</h5>

							<label for="emailAddress">Email Address</label>
							<input v-model="email" type="email" class="form-control email" placeholder="example@email.com" v-on:keyup.enter="signUp" id="emailAddress">

							<button v-on:click="signUp" class="btn btn-primary button signup-btn">Try Tardigrade</button>

							<GetFileZilla></GetFileZilla>

						</div>
					</div>
				</div>
			</div>

			<div class="how">
				<div class="container">
					<div class="row py-5">

						<div class="col-sm-12 col-md-5 pb-5">
							<div class="video embed-responsive embed-responsive-16by9 mb-5">
								<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/RtyBjWmbePQ" frameborder="0" allowfullscreen></iframe>
							</div>
							<h2>How Tardigrade Works</h2>
							<p>Tardigrade splits files into encrypted pieces, then distributes them on a global network, and recompiles each piece on download. This means your data isn't being stored in a vulnerable data center, it's being securely stored all over the world.</p>
							<a href="https://link.tardigradeshare.io/15CYbbCAnFyMjXZdZs8sVJ8JbGdCKjdaMCjhNKF937pUMikZnXCBDu6SeemVbQ1opJW257otj7SXFaM7DSEGf9Fm6LjtSPQycMXskWbsbWyNY6q6vetvhRY8TsBLKxuB5778sNfVHvnstGHRUB26cKNpZsnRjCXfzqyDLCB2Rd2euu3qf4d3sNFHKwrym9Ubf8ctbAUsQyruK7TJhFHVBGgQLfVDXnoHZo7CcGXDE1gxL27ac2u8YN1tj4vAGvTVy5e2V9mArg7wrJ3q25g9WwerDjScgQFwvPTABBjwyckH8dmH6cTyhqfgsf8UMj9gAc8ygJHbrroZkx3PpxeEvLVHpGvoWSQbyR7SDqdp1UYQ5gCG1T4nPoRrxjMHDCwgScEAAoBb7TJu5pmznEk6KEXb98oriJ1NU3Gh7oykbeQCKHMnwNd2e8W1NcMbFJN8TrWtpzDXafQSWDPEykJot3o3526VWYBDXdCao3C31V99mMf2tEcaWFDnhjv9a97Ck2UKZ8EB8vwPq4tW/homepage/TardigradeExplainerVideo.m4v" class="btn btn-primary button mt-4 px-5">See Tardigrade in Action</a>
						</div>

						<div class="col-sm-12 col-md-6 offset-md-1">
							<div class="row mb-5">
								<div class="col-1">
									<img src="@/assets/tar-ico-secure.svg" alt="100% Secure" height="32" width="32">
								</div>
								<div class="col-11 px-4">
									<h5>100% Secure</h5>
									<p>Store your data with confidence, knowing Tardigrade uses end-to-end encryption and decentralization to offer unparalled security.</p>
								</div>
							</div>

							<div class="row mb-5">
								<div class="col-1">
									<img src="@/assets/tar-ico-durable.svg" alt="Remarkably Durable" height="32" width="32">
								</div>
								<div class="col-11 px-4">
									<h5>Remarkably Durable</h5>
									<p>Don't worry about downtime and outages. Files on Tardigrade are split into pieces and distributed on a global network, which is why we've never lost a file.</p>
								</div>
							</div>

							<div class="row mb-5">
								<div class="col-1">
									<img src="@/assets/tar-ico-money.svg" alt="Predictable Pricing" height="32" width="32">
								</div>
								<div class="col-11 px-4">
									<h5>Predictable Pricing</h5>
									<p>Tardigrade is a fraction of the cost of other storage solutions, and out pricing is predictable so you don't run into surprises when looking at your bill.</p>
								</div>
							</div>

							<div class="row mb-5">
								<div class="col-1">
									<img src="@/assets/tar-ico-global.svg" alt="Globally Distributed" height="32" width="32">
								</div>
								<div class="col-11 px-4">
									<h5>Globally Distributed</h5>
									<p>Most storage services run on data centers. Tardigrade never puts your file in one place, so downtime and breaches are a thing of the past.</p>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>

		</div>

		<div v-else>
			<Keys v-bind:apiKey="apiKey" v-bind:satelliteAddress="satelliteAddress"></Keys>
		</div>


</template>

<script>
import axios from 'axios';
=======
<div class="home">
	<div v-cloak @drop.prevent="addFile" @dragover.prevent class="upload-area">
		Drag and drop files here
	</div>

	<div class="bucket-actions">
		<button v-on:click="directoryInput = ''" class="btn btn-warning">
			<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-folder" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				<path d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z" />
				<path fill-rule="evenodd"
				 d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z" />
			</svg>

			Make Directory
		</button>
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
			<tr v-if="directoryInput !== null">
				<td><input type="text" v-model="directoryInput" v-on:keydown.enter="createDirectory"></td>
			</tr>

			<tr v-for="file in filesUploading">
				<td class="upload-text">
					<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-earmark" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
						<path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z" />
					</svg>
					{{file.Key}}
				</td>
				<td></td>
				<td></td>
				<td>
					<div class="spinner-border" role="status">
						<span class="sr-only">Loading...</span>
					</div>
				</td>
			</tr>


			<tr v-for="file in files">
				<td>
					<svg v-if="file._type === 'file'" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-earmark" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
						<path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z" />
					</svg>

					<svg v-if="file._type === 'folder'" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-folder" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z" />
						<path fill-rule="evenodd"
						 d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z" />
					</svg>

					{{file.Key}}
				</td>
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
	} catch (err) {
		if (err.code !== "NotFound") {
			throw new Error(err.code);
		}
>>>>>>> parent of 92557b7a (start of refactor)

import Hero from '../components/Hero.vue';
import GetFileZilla from '../components/GetFileZilla.vue';
import Keys from '../components/Keys.vue';

async function getNearestSatellite() {
	const { data } = await axios.get('https://api.ipstack.com/check?access_key=5dd8fea718f2696702ad78adbc9faeab');

	const satellites = {
		'us-central-1.tardigrade.io': [41.2619, -95.8608],
		'europe-west-1.tardigrade.io': [50.8274, 4.348],
		'asia-east-1.tardigrade.io': [25.0478, 121.5318]
	};

	function distance(lat1, lon1, lat2, lon2, unit) {
		if ((lat1 == lat2) && (lon1 == lon2)) {
				return 0;
		} else {
			var radlat1 = Math.PI * lat1/180;
			var radlat2 = Math.PI * lat2/180;
			var theta = lon1-lon2;
			var radtheta = Math.PI * theta/180;
			var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			if (dist > 1) {
				dist = 1;
			}
			dist = Math.acos(dist);
			dist = dist * 180/Math.PI;
			dist = dist * 60 * 1.1515;
			if (unit=="K") { dist = dist * 1.609344 }
			if (unit=="N") { dist = dist * 0.8684 }
			return dist;
		}
	}

	let nearestSatellite;
	let nearestSatelliteDistance = Infinity;

	for(const satellite in satellites) {
		const [ lat, lon ] = satellites[satellite];

		const dist = distance(data.latitude, data.longitude, lat, lon);

		if(dist < nearestSatelliteDistance) {
			nearestSatellite = satellite;
			nearestSatelliteDistance = dist;
		}
	}

	return nearestSatellite;
};

export default {
	name: 'Home',
	data: () => ({
		email: '',
		apiKey: null,
		satelliteAddress: null
	}),
	computed: {
		validEmail() {
			const re = /\S+@\S+\.\S+/;
			return re.test(this.email);
		}
	},
	methods: {
<<<<<<< HEAD
		async signUp() {
			if(!this.validEmail)
				return;
=======
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

				this.files = list.Contents
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

				cb();
			});
		},
>>>>>>> parent of 92557b7a (start of refactor)

			let satellite = undefined;

			try {
				satellite = await getNearestSatellite();
			} catch(err) {
				satellite = "us-central-1.tardigrade.io";

				console.log('set satellite to default us-central-1');
			}

			const { data } = await axios.post('/api/sign-up', {
				email: this.email,
				satelliteAddress: satellite
			});

			this.apiKey = data.apiKey;
			this.satelliteAddress = data.satelliteAddress;
		}
	},
<<<<<<< HEAD
	components: {
		Hero,
		GetFileZilla,
		Keys
	},
	async created() {
=======
	filters: {
		prettyBytes
	},
	created() {
		this.listFiles();
>>>>>>> parent of 92557b7a (start of refactor)
	}
}

</script>
