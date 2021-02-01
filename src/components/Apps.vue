<style media="screen">
	.apps-bg {
		background: url("../assets/apps-bg.svg");
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
<template>
	<div class="keys">
		<div class="row">

			<div class="col-sm-12">
				<div class="card border-0 py-4 py-lg-5 mb-5">

					<div class="row">
						<div class="col">
							<div class="apps-bg p-5">
								<h4 class="mb-3 text-center">Use Storj in Your Favourite Applications</h4>
								<p class="text-center">You can view and manage your files above or access them with the credentials below.</p>
							</div>
						</div>
					</div>

					<div class="row m-5">
						<div class="col-xs-12 col-sm-6 col-md-3 mb-5">
							<img src="@/assets/filezilla.png" width="40" class="mb-3" alt="Filezilla">
							<h5>Filezilla</h5>
							<p>Use Storj as your storage layer in FileZilla.</p>
							<a href="#">Visit Website</a>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-3 mb-5">
							<img src="@/assets/rclone.png" width="40" class="mb-3" alt="Rclone">
							<h5>Rclone</h5>
							<p>Map file systems to the decentralized cloud.</p>
							<a href="#">Visit Website</a>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-3 mb-5">
							<img src="@/assets/restic.png" width="40" class="mb-3" alt="Restic">
							<h5>Restic</h5>
							<p>Backup your files, servers, and directories.</p>
							<a href="#">Visit Website</a>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-3 mb-5">
							<img src="@/assets/duplicati.png" width="40" class="mb-3" alt="Duplicati">
							<h5>Duplicati</h5>
							<p>Automatically backup to Storj with Duplicati.</p>
							<a href="#">Visit Website</a>
						</div>
					</div>

					<div class="row mb-4 mx-5">
						<div class="col text-left">
							<label class="label" for="stargate-endpoint">S3 Compatible Endpoint</label>
							<input type="text" id="stargate-endpoint" class="form-control" autocomplete="off" v-model="this.$store.state.stargateEndpoint" disabled>
							<button v-on:click="copy($store.state.stargateEndpoint, 'endpointCopyText')" class="copy">{{endpointCopyText}}</button>
						</div>
					</div>

					<div class="row mb-4 mx-5">
						<div class="col text-left">
							<label class="label" for="access-key">Access Key</label>
							<input type="text" id="access-key" class="form-control" autocomplete="off" v-model="this.$store.state.stargateAccessKey" disabled>
							<button v-on:click="copy($store.state.stargateAccessKey, 'accessKeyCopyText')" class="copy">{{accessKeyCopyText}}</button>
						</div>
					</div>

					<div class="row mb-4 mx-5">
						<div class="col text-left">
							<label class="label" for="secret-key">Secret Key</label>
							<input type="text" id="secret-key" class="form-control" autocomplete="off" v-model="this.$store.state.stargateSecretKey" disabled>
							<button v-on:click="copy($store.state.stargateSecretKey, 'secretKeyCopyText')" class="copy">{{secretKeyCopyText}}</button>
						</div>
					</div>

					<div class="row mb-5 mx-5">
						<div class="col text-left">
							<label class="label" for="bucket">Bucket</label>
							<input type="text" id="bucket" class="form-control" autocomplete="off" v-model="this.$store.state.stargateBucket" disabled>
							<button v-on:click="copy($store.state.stargateBucket, 'bucketCopyText')" class="copy">{{bucketCopyText}}</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		endpointCopyText: 'Copy',
		accessKeyCopyText: 'Copy',
		secretKeyCopyText: 'Copy',
		bucketCopyText: 'Copy'
	}),
	methods: {
		async copy(text, field) {
			await navigator.permissions.query({
				name: "clipboard-write"
			});

			await navigator.clipboard.writeText(text);

			this[field] = 'Copied!';

			await new Promise(r => setTimeout(r, 1000));

			this[field] = 'Copy';
		}
	}
};
</script>
