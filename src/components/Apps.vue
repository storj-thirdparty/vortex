<style media="screen">
	.apps-bg {
		background: url("../assets/apps-bg.svg");
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
	}
	.docs-bg {
		background: #F7F8FB;
	}
	.link {
		border-bottom: 2px solid;
	}
</style>
<template>
	<div class="keys">
		<div class="row">

			<div class="col-sm-12">
				<div class="card border-0 pt-4 pt-lg-5 mb-5">

					<div class="row">
						<div class="col">
							<div class="apps-bg p-5 mb-5 text-center">
								<h4 class="mb-3 text-center">Backup Data with Storj + Duplicati</h4>
								<img src="@/assets/duplicati-preview.svg" alt="Duplicati" class="img-fluid">
							</div>
						</div>
					</div>

					<!-- <div class="row">
						<div class="col">
							<div class="apps-bg p-5">
								<h4 class="mb-3 text-center">Use Storj in Your Favourite Applications</h4>
								<p class="text-center">You can view and manage your files above or access them with the credentials below.</p>
							</div>
						</div>
					</div>

					<div class="row m-5">
						<div class="col-xs-12 col-sm-6 col-md-3 mb-5">
							<img src="@/assets/duplicati.png" width="40" class="mb-3" alt="Duplicati">
							<h5>Duplicati</h5>
							<p>Free backup software to store encrypted backups.</p>
							<a href="https://www.duplicati.com">Visit Website</a>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-3 mb-5">
							<img src="@/assets/rclone.png" width="40" class="mb-3" alt="Rclone">
							<h5>Rclone</h5>
							<p>Rclone syncs your files to cloud storage.</p>
							<a href="https://rclone.org">Visit Website</a>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-3 mb-5">
							<img src="@/assets/restic.png" width="40" class="mb-3" alt="Restic">
							<h5>Restic</h5>
							<p>Backup your files, servers, and directories.</p>
							<a href="https://restic.net">Visit Website</a>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-3 mb-5">
							<img src="@/assets/filezilla.png" width="40" class="mb-3" alt="Filezilla-pro">
							<h5>Filezilla Pro</h5>
							<p>Professional FTP and Cloud Storage tool. (Paid)</p>
							<a href="https://filezillapro.com">Visit Website</a>
						</div>
					</div> -->

					<div class="row p-5">
						<div class="col-12 col-lg-5 px-5 pb-5">
							<img src="@/assets/duplicati.svg" width="80" class="mb-3" alt="Duplicati">
							<h4>Duplicati</h4>
							<p class="mb-3">Duplicati text copy lorem ipsum dolor sit amet so un do miret.</p>
							<a href="https://www.duplicati.com/download" target="_blank" class="btn btn-primary px-5 py-2 mt-2 mb-3">Download</a>
							<p><a href="https://www.duplicati.com/" target="_blank" class="link">Visit Website</a></p>
						</div>

						<div class="col-12 col-lg-7 px-5">
							<div class="row mb-4">
								<div class="col text-left">
									<label class="label" for="stargate-endpoint">S3 Compatible Endpoint</label>
									<input type="text" id="stargate-endpoint" class="form-control" autocomplete="off" v-model="this.$store.state.stargateEndpoint" disabled>
									<button v-on:click="copy($store.state.stargateEndpoint, 'endpointCopyText')" class="copy">{{endpointCopyText}}</button>
								</div>
							</div>

							<div class="row mb-4">
								<div class="col text-left">
									<label class="label" for="access-key">Access Key</label>
									<input type="text" id="access-key" class="form-control" autocomplete="off" v-model="this.$store.state.stargateAccessKey" disabled>
									<button v-on:click="copy($store.state.stargateAccessKey, 'accessKeyCopyText')" class="copy">{{accessKeyCopyText}}</button>
								</div>
							</div>

							<div class="row mb-4">
								<div class="col text-left">
									<label class="label" for="secret-key">Secret Key</label>
									<input type="text" id="secret-key" class="form-control" autocomplete="off" v-model="this.$store.state.stargateSecretKey" disabled>
									<button v-on:click="copy($store.state.stargateSecretKey, 'secretKeyCopyText')" class="copy">{{secretKeyCopyText}}</button>
								</div>
							</div>

							<div class="row mb-5">
								<div class="col text-left">
									<label class="label" for="bucket">Bucket</label>
									<input type="text" id="bucket" class="form-control" autocomplete="off" v-model="this.$store.state.stargateBucket" disabled>
									<button v-on:click="copy($store.state.stargateBucket, 'bucketCopyText')" class="copy">{{bucketCopyText}}</button>
								</div>
							</div>
						</div>
					</div>

					<div class="docs-bg rounded-bottom">
						<div class="row p-5">
							<div class="col-12 col-lg-5 p-5">
								<h5 class="mb-4">Docs</h5>
								<a href="#">Getting Started</a>
							</div>
							<div class="col-12 col-lg-7 p-5">
								<h5 class="mb-4">Getting Started</h5>
								<h6>Quickstart Video</h6>
								<div class="embed-responsive embed-responsive-16by9 mt-3 mb-5 rounded">
									<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/dqj_KEepneY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
								</div>
								<h6>Set Up</h6>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
								<img src="@/assets/setup-preview.jpg" class="img-fluid mt-3 mb-5 rounded" alt="Set up">
								<h6>Duplicati Docs</h6>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua.</p>
								<a href="https://documentation.tardigrade.io/how-tos/backup-with-duplicati" target="_blank" class="link">Visit the Docs</a>
							</div>
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
