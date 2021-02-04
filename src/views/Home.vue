<style>
h1,
h2,
h3,
h4,
h5,
h6 {
	font-family: Inter;
	font-weight: bold;
}

p,
span,
a {
	line-height: 1.5;
}

.input {
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

	padding-left: 45px !important;
}

.email {
	background: url("~@/assets/tar-ico-email.svg") no-repeat 16px 16px;
	padding-left: 48px;

}

.password {
	background: url("~@/assets/tar-ico-lock.svg") no-repeat 16px 16px;
	background-position-x: 20px;
	padding-left: 48px;
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

.btn-primary {
	background: #0068DC;
}

.btn-light {
	background: #E6E9EF;
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
	background: #0059D0;
	border: 1px solid #0059D0;
	border-radius: 4px;
	font-weight: bold;
	font-size: 14px;
	text-align: center;
	color: #fff;
	cursor: pointer;
	position: absolute;
	bottom: 8px;
	right: 26px;
	padding: 4px 14px;
	line-height: 1.6;
	transition: all 100ms ease-in-out;
}

.keys .copy:hover {
	background: #2582FF;
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

.form-control:disabled, .form-control[readonly] {
  background-color: #F7F8FB;
}

.keys .alert-warning {
	color: #000;
	background-color: #fff9f6;
	border-color: #f9a482;
}

.spinner-border {
	color: #0068dc;
}

.nav-tabs {
	border-bottom: none;
}

.nav-item svg {
	margin-top: -2px;
	margin-right: 3px;
}

.nav-tabs .nav-link {
	background: #EFF1F5;
	color: #000;
	border-color: #DDE1E6;
	padding: 12px;
	border-bottom: 2px solid #dde1e6;
	transition: all 100ms ease-in-out;
}
.nav-tabs .nav-link.active {
	font-weight: bold;
	color: #000;
}

.nav-tabs .nav-link:hover {
	color: #0068dc;
	background: #f8f9fb;
}
.nav-tabs .nav-link.active:hover {
	background: #fff;
	color: #000;
}

</style>

<template>
<div>
	<div>

		<div class="container">
			<div class="row">
				<div class="col-sm-12 col-md-6 col-lg-5 pt-5 mt-0 mt-lg-5">
					<Hero></Hero>
				</div>

				<div class="col-sm-12 col-md-6 col-lg-6 offset-lg-1">
					<div class="card border-0 p-4 p-lg-5 mb-5">

						<div v-if="error" class="alert alert-danger" role="alert">
							{{error}}
						</div>

						<div v-if="showLogin === false">
							<h5 class="mb-4">Get Started</h5>

							<label for="emailAddress">Email Address</label>
							<input v-model="email" required type="email" class="form-control input email" placeholder="example@email.com" v-on:keyup.enter="signUp" id="emailAddress">

							<label for="password">Password</label>
							<input v-model="password" required type="password" class="form-control input password" placeholder="••••••••••••" v-on:keyup.enter="signUp" id="password">

							<div class="custom-control custom-checkbox mb-3">
								<input v-model="termsAndConditions" required type="checkbox" class="custom-control-input" id="termsCheck">
								<label class="custom-control-label" for="termsCheck">Accept the <a href="https://tardigrade.io/terms-of-service/" target="_blank">Terms &amp; Conditions</a></label>
							</div>

							<button v-on:click="signUp" class="btn btn-primary button btn-block">Try Storj</button>

							<hr>


							<button v-on:click="showLogin = true" class="button-no-bg btn btn-success btn-block">Login to Storj</button>
						</div>

						<div v-if="showLogin === true">
							<h5 class="mb-4">Login</h5>

							<label for="emailAddress">Email Address</label>
							<input v-model="email" type="email" class="form-control input email" placeholder="example@email.com" v-on:keyup.enter="signUp" id="emailAddress">

							<label for="password">Password</label>
							<input v-model="password" type="password" class="form-control input password" placeholder="••••••••••••" v-on:keyup.enter="signUp" id="password">

							<button v-on:click="login" class="btn btn-primary button signup-btn btn-block">Login</button>

							<p>Don't have an account? <a v-on:click="showLogin = false" href="#">Sign Up</a></p>
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
						<h2 class="mb-4">How It Works</h2>
						<p>This app is powered by the Tardigrade decentralized cloud service, the world’s first decentralized cloud object storage service. The Tardigrade cloud storage platform utilizes spare disk drive space and bandwidth shared by
							its community members worldwide. <br /><br />Tardigrade splits files into encrypted pieces, then distributes them on a global network, and recompiles each piece on download. This means your data isn’t being stored in a
							vulnerable data center; it’s securely stored all over the world.</p>
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
								<p>Storj is a fraction of the cost of other storage solutions, and pricing is predictable so you don't run into surprises when looking at your bill.</p>
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

		<main-footer></main-footer>

	</div>
</div>
</template>

<script>
import axios from 'axios';

import Hero from '../components/Hero.vue';
import MainFooter from '../components/MainFooter.vue';

let s3;

const Bucket = 'web';

export default {
	name: 'Home',
	data: () => ({
		apiKey: '',
		email: '',
		password: '',
		termsAndConditions: false,
		message: '',
		showLogin: false
	}),
	methods: {
		async signUp() {
			this.$store.dispatch('signUp', {
				email: this.email,
				password: this.password,
				termsAndConditions: this.termsAndConditions
			})
		},

		async login() {
			this.$store.dispatch('login', {
				email: this.email,
				password: this.password
			});
		}
	},
	computed: {
		error() {
			return this.$store.state.userError;
		},
		isLoggedIn() {
			return this.$store.getters.isLoggedIn;
		}
	},
	watch: {
		isLoggedIn(loggedIn) {
			if(loggedIn === true) {
				this.$router.push({path:'/dashboard'});
			}
		}
	},
	components: {
		Hero,
		MainFooter,
	},
	async created() {
		const urlParams = new URLSearchParams(window.location.search);

		const activation = urlParams.get('activation');

		if (activation) {
			await axios.post('/api/activate', {
				token: activation
			});
		}

		await this.$store.dispatch('passiveLogin');
	}
}
</script>
