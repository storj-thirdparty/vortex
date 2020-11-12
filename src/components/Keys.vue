<style scoped>
	.title {
		font-weight: bold;
		font-size: 29px;
		line-height: 43px;
		text-align: center;
		color: #252525;
	}

	.label {
		font-weight: bold;
		font-size: 16px;
		color: #354049;
	}

	.copy {
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
	.copy:hover {
		background: #0068DC;
		color: #fff;
	}
	a {
		font-weight: bold;
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
	.alert-warning {
    color: #000;
    background-color: #fff9f6;
    border-color: #f9a482;
	}
</style>

<template>

	<div class="container">
		<div class="row">
			<!--<div class="col-sm-12 col-md-5 py-5 text-center">
				<div class="video embed-responsive embed-responsive-16by9 mt-4 mb-5">
					<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/UgJw-_7mOpI" frameborder="0" allowfullscreen></iframe>
				</div>
				<h5>Watch the Quickstart Video</h5>
				<p>See how easy it is to start using your 1 TB of free cloud storage space on Tardigrade.</p>
				<a href="https://documentation.tardigrade.io/how-tos/set-up-filezilla-for-decentralized-file-transfer" target="_blank">Or Visit the Docs</a>
			</div>-->

			<div class="col-sm-12">
				<div class="card border-0 p-4 p-lg-5 mb-5 mt-4">

					<h5 class="mb-2">Welcome, You've Earned 1 TB Free!</h5>
					<p>We'll send you an email to confirm your account soon.</p>

					<div class="row mb-3">
						<div class="col text-left">
							<label class="label" for="satellite">Satellite Region</label>
							<input type="text" id="satellite" class="form-control" placeholder="Sattelite" autocomplete="off" v-model="satelliteAddress" disabled>
							<button v-on:click="copySatelliteAddress" class="copy">Copy</button>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col text-left">
							<label class="label" for="api-key">API Key</label>
							<input type="text" id="api-key" class="form-control fs-exclude" placeholder="API Key" autocomplete="off" v-model="apiKey" disabled>
							<button v-on:click="copyApiKey" class="copy">Copy</button>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col text-left">
							<label class="label" for="api-key">Access Grant</label>
							<input type="text" id="access-grant" class="form-control fs-exclude" placeholder="" autocomplete="off" v-model="accessGrant" disabled>
							<button v-on:click="copyAccessGrant" class="copy">Copy</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>

</template>

<script>
export default {
	props: [
		'apiKey',
		'satelliteAddress'
	],
	methods: {
		copySatelliteAddress() {
			window.navigator.clipboard.writeText(this.satelliteAddress);
		},
		copyApiKey() {
			window.navigator.clipboard.writeText(this.apiKey);
		}
	}
}
</script>
