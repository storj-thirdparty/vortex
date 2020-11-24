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

.how {
	background: #fff;
	padding: 40px 0;
	margin-top: 40px;
}
</style>

<template>
<div>
	<div v-if="!apiKey">

		<div class="container">
			<div class="row">
				<div class="col-sm-12 col-md-6 col-lg-5 py-5 mt-0 mt-lg-5">
					<Hero></Hero>
				</div>

				<div class="col-sm-12 col-md-6 col-lg-6 offset-lg-1">
					<div class="card border-0 p-4 p-lg-5 mb-5 mt-4">

						<div v-if="error.length > 0" class="alert alert-danger" role="alert">
							{{error}}
						</div>

						<div v-if="login === false">
							<h5 class="mb-4">Get Started</h5>

							<label for="emailAddress">Email Address</label>
							<input v-model="email" type="email" class="form-control email" placeholder="example@email.com" v-on:keyup.enter="signUp" id="emailAddress">

							<label for="password">Password</label>
							<input v-model="password" type="password" class="form-control email" placeholder="••••••••••••" v-on:keyup.enter="signUp" id="password">

							<div class="custom-control custom-checkbox mb-3">
							  <input v-model="termsAndConditions" type="checkbox" class="custom-control-input" id="termsCheck">
							  <label class="custom-control-label" for="termsCheck">Accept the <a href="https://tardigrade.io/terms-of-service/" target="_blank">Terms &amp; Conditions</a></label>
							</div>

							<button v-on:click="signUp" v-bind:disabled="!loginActivated" class="btn btn-primary button signup-btn btn-block">Try Storj</button>

							<p>Already Signed Up? <a v-on:click="login = true" href="#">Log In</a></p>
						</div>

						<div v-if="login === true">
							<h5 class="mb-4">Login</h5>

							<label for="emailAddress">Email Address</label>
							<input v-model="email" type="email" class="form-control email" placeholder="example@email.com" v-on:keyup.enter="signUp" id="emailAddress">

							<label for="password">Password</label>
							<input v-model="password" type="password" class="form-control email" placeholder="••••••••••••" v-on:keyup.enter="signUp" id="password">

							<button v-on:click="login" class="btn btn-primary button signup-btn btn-block">Try Storj</button>

							<p>Don't have an account? <a v-on:click="login = false" href="#">Sign Up</a></p>
						</div>

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
						<h2 class="mb-4">How Storj Works</h2>
						<p>Storj splits files into encrypted pieces, then distributes them on a global network, and recompiles each piece on download. This means your data isn't being stored in a vulnerable data center, it's being securely stored all
							over the world.</p>
					</div>

					<div class="col-sm-12 col-md-6 offset-md-1">
						<div class="row mb-5">
							<div class="col-1">
								<img src="@/assets/tar-ico-secure.svg" alt="100% Secure" height="32" width="32">
							</div>
							<div class="col-11 px-4">
								<h5 class="mb-3">100% Secure</h5>
								<p>Store your data with confidence, knowing Storj uses end-to-end encryption and decentralization to offer unparalled security.</p>
							</div>
						</div>

						<div class="row mb-5">
							<div class="col-1">
								<img src="@/assets/tar-ico-durable.svg" alt="Remarkably Durable" height="32" width="32">
							</div>
							<div class="col-11 px-4">
								<h5 class="mb-3">Remarkably Durable</h5>
								<p>Don't worry about downtime and outages. Files on Storj are split into pieces and distributed on a global network, which is why we've never lost a file.</p>
							</div>
						</div>

						<div class="row mb-5">
							<div class="col-1">
								<img src="@/assets/tar-ico-money.svg" alt="Predictable Pricing" height="32" width="32">
							</div>
							<div class="col-11 px-4">
								<h5 class="mb-3">Predictable Pricing</h5>
								<p>Storj is a fraction of the cost of other storage solutions, and out pricing is predictable so you don't run into surprises when looking at your bill.</p>
							</div>
						</div>

						<div class="row mb-5">
							<div class="col-1">
								<img src="@/assets/tar-ico-global.svg" alt="Globally Distributed" height="32" width="32">
							</div>
							<div class="col-11 px-4">
								<h5 class="mb-3">Globally Distributed</h5>
								<p>Most storage services run on data centers. Storj never puts your file in one place, so downtime and breaches are a thing of the past.</p>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>

	</div>

	<div v-else>
		<Keys v-bind:apiKey="apiKey" v-bind:satelliteAddress="satelliteAddress" v-bind:accessGrant="accessGrant"></Keys>

		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<file-browser v-bind="{ files, path }" v-on:uploadFile="uploadFile"></file-browser>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';
import wasm from '../wasm.js';

import Hero from '../components/Hero.vue';
import Keys from '../components/Keys.vue';
import FileBrowser from '../components/FileBrowser.vue';

let s3;

const Bucket = 'web';


export default {
	name: 'Home',
	data: () => ({
		apiKey: '',
		email: '',
		password: '',
		termsAndConditions: false,
		error: '',

		login: false
	}),
	computed: {
		loginActivated() {
			const re = /\S+@\S+\.\S+/;

			return this.termsAndConditions === true && this.password.length > 0 && re.test(this.email);
		}
	},
	methods: {
		async signUp() {
			const {data} = await axios.post('/api/signup', {
				email: this.email,
				password: this.password
			});

			if(data.error) {
				this.error = data.error;
			}
		},

		async login() {
			const {data} = await axios.post('/api/login', {
				email: this.email,
				password: this.password
			});

			if(data.error) {
				this.error = data.error;
			}
		}
	},
	components: {
		Hero,
		Keys,
		FileBrowser
	}
}
</script>
