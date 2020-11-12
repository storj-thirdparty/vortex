<style>
h1,
h2,
h3,
h4,
h5,
h6 {
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
<div v-if="!apiKey">

	<div class="container">
		<div class="row">
			<div class="col-sm-12 col-md-6 col-lg-5 py-5 mt-0 mt-lg-5">
				<Hero></Hero>
			</div>

			<div class="col-sm-12 col-md-6 col-lg-6 offset-lg-1">
				<div class="card border-0 p-4 p-lg-5 mb-5 mt-4">

					<h5 class="mb-4">Try Storj</h5>

					<label for="emailAddress">Email Address</label>
					<input v-model="email" type="email" class="form-control email" placeholder="example@email.com" v-on:keyup.enter="signUp" id="emailAddress">

					<label for="password">Password</label>
					<input v-model="password" type="password" class="form-control email" placeholder="••••••••••••" v-on:keyup.enter="signUp" id="password">


					<button v-on:click="signUp" class="btn btn-primary button signup-btn">Try Storj</button>

					<!--<GetFileZilla></GetFileZilla>-->

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
					<h2>How Storj Works</h2>
					<p>Storj splits files into encrypted pieces, then distributes them on a global network, and recompiles each piece on download. This means your data isn't being stored in a vulnerable data center, it's being securely stored all
						over the world.</p>
					<a
					 href="https://link.tardigradeshare.io/15CYbbCAnFyMjXZdZs8sVJ8JbGdCKjdaMCjhNKF937pUMikZnXCBDu6SeemVbQ1opJW257otj7SXFaM7DSEGf9Fm6LjtSPQycMXskWbsbWyNY6q6vetvhRY8TsBLKxuB5778sNfVHvnstGHRUB26cKNpZsnRjCXfzqyDLCB2Rd2euu3qf4d3sNFHKwrym9Ubf8ctbAUsQyruK7TJhFHVBGgQLfVDXnoHZo7CcGXDE1gxL27ac2u8YN1tj4vAGvTVy5e2V9mArg7wrJ3q25g9WwerDjScgQFwvPTABBjwyckH8dmH6cTyhqfgsf8UMj9gAc8ygJHbrroZkx3PpxeEvLVHpGvoWSQbyR7SDqdp1UYQ5gCG1T4nPoRrxjMHDCwgScEAAoBb7TJu5pmznEk6KEXb98oriJ1NU3Gh7oykbeQCKHMnwNd2e8W1NcMbFJN8TrWtpzDXafQSWDPEykJot3o3526VWYBDXdCao3C31V99mMf2tEcaWFDnhjv9a97Ck2UKZ8EB8vwPq4tW/homepage/StorjExplainerVideo.m4v"
					 class="btn btn-primary button mt-4 px-5">See Storj in Action</a>
				</div>

				<div class="col-sm-12 col-md-6 offset-md-1">
					<div class="row mb-5">
						<div class="col-1">
							<img src="@/assets/tar-ico-secure.svg" alt="100% Secure" height="32" width="32">
						</div>
						<div class="col-11 px-4">
							<h5>100% Secure</h5>
							<p>Store your data with confidence, knowing Storj uses end-to-end encryption and decentralization to offer unparalled security.</p>
						</div>
					</div>

					<div class="row mb-5">
						<div class="col-1">
							<img src="@/assets/tar-ico-durable.svg" alt="Remarkably Durable" height="32" width="32">
						</div>
						<div class="col-11 px-4">
							<h5>Remarkably Durable</h5>
							<p>Don't worry about downtime and outages. Files on Storj are split into pieces and distributed on a global network, which is why we've never lost a file.</p>
						</div>
					</div>

					<div class="row mb-5">
						<div class="col-1">
							<img src="@/assets/tar-ico-money.svg" alt="Predictable Pricing" height="32" width="32">
						</div>
						<div class="col-11 px-4">
							<h5>Predictable Pricing</h5>
							<p>Storj is a fraction of the cost of other storage solutions, and out pricing is predictable so you don't run into surprises when looking at your bill.</p>
						</div>
					</div>

					<div class="row mb-5">
						<div class="col-1">
							<img src="@/assets/tar-ico-global.svg" alt="Globally Distributed" height="32" width="32">
						</div>
						<div class="col-11 px-4">
							<h5>Globally Distributed</h5>
							<p>Most storage services run on data centers. Storj never puts your file in one place, so downtime and breaches are a thing of the past.</p>
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
import wasm from '../wasm.js';

import Hero from '../components/Hero.vue';
import Keys from '../components/Keys.vue';

export default {
	name: 'Home',
	data: () => ({
		email: '',
		password: '',
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
		async signUp() {
			/*
			const { data } = await axios.post('/api/sign-up', {
				email: this.email,
				satelliteAddress: satellite
			});
			*/

			const data = {
				"apiKey": "13YqfF5cCFzVGxvRXZsBrz8vdV1MaZJoVzB3LuMZarkK3XKA4XJM6LbhUqpZvZREy8zxgTJQajhkKzbtivHrEFgFjTYNV5QrfcqMX7D",
				"satelliteAddress": "europe-west-1.tardigrade.io"
			};

			this.apiKey = data.apiKey;
			this.satelliteAddress = data.satelliteAddress;

			const satellites = {
				"us-central-1.tardigrade.io": "12EayRS2V1kEsWESU9QMRseFhdxYxKicsiFmxrsLZHeLUtdps3S@us-central-1.tardigrade.io:7777",
				"europe-west-1.tardigrade.io": "12L9ZFwhzVpuEKMUNUqkaTLGzwY9G24tbiigLiXpmZWKwmcNDDs@europe-west-1.tardigrade.io:7777",
				"asia-east-1.tardigrade.io": "121RTSDpyNZVcEU84Ticf2L1ntiuUimbWgfATz21tuvgk3vzoA6@asia-east-1.tardigrade.io:7777"
			}

			const obj = await wasm.generateAccessGrant(satellites[this.satelliteAddress], this.apiKey, this.password, "Filezilla");

			console.log(obj);
		}
	},
	components: {
		Hero,
		Keys
	}
}
</script>
