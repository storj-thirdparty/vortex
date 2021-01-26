<template>
	<div class="keys">
		<div class="row">

			<div class="col-sm-12">
				<div class="card border-0 p-4 p-lg-5 mb-5">
					<h5 class="mb-2">Use Storj in your favourite applications</h5>
					<p>You can view and manage your files above or access them with the credentials below.</p>

					<div class="row mb-3">
						<div class="col text-left">
							<label class="label" for="stargate-endpoint">S3 Compatible Endpoint</label>
							<input type="text" id="stargate-endpoint" class="form-control" autocomplete="off" v-model="this.$store.state.stargateEndpoint" disabled>
							<button v-on:click="copy($store.state.stargateEndpoint)" class="copy">Copy</button>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col text-left">
							<label class="label" for="access-key">Access Key</label>
							<input type="text" id="access-key" class="form-control" autocomplete="off" v-model="this.$store.state.stargateAccessKey" disabled>
							<button v-on:click="copy($store.state.stargateAccessKey)" class="copy">Copy</button>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col text-left">
							<label class="label" for="secret-key">Secret Key</label>
							<input type="text" id="secret-key" class="form-control" autocomplete="off" v-model="this.$store.state.stargateSecretKey" disabled>
							<button v-on:click="copy($store.state.stargateSecretKey)" class="copy">Copy</button>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col text-left">
							<label class="label" for="bucket">Bucket</label>
							<input type="text" id="bucket" class="form-control" autocomplete="off" v-model="this.$store.state.stargateBucket" disabled>
							<button v-on:click="copy($store.state.stargateBucket)" class="copy">Copy</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		async copy(text) {
			await navigator.permissions.query({
				name: "clipboard-write"
			});

			await navigator.clipboard.writeText(text);
		}
	}
};
</script>
