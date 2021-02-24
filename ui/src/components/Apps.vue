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
	a.docs-link {
		padding: 14px 18px;
		border-radius: 8px;
		color: #000;
		width: 100%;
		display: block;
		font-weight: normal;
		margin-bottom: 20px;
	}
	a.docs-link-active {
		background: #fff;
		border-left: 7px solid #0059d0;
		padding-left: 9px;
		font-weight: bold;
	}
	.link {
		border-bottom: 2px solid;
	}
	.link:hover {
		text-decoration: none;
	}
</style>
<template>
	<div class="keys">
		<div class="row">

			<div class="col-sm-12">
				<div class="container card card-top-flat border-0">

					<div class="row border-bottom px-5 pt-4">
						<div class="col-md-12 col-lg-6">
								<h4 class="mt-4 mt-xl-5 text-center text-lg-left">Backup Data with Storj + Duplicati</h4>
						</div>
						<div class="col-md-12 col-lg-6 text-center">
								<img src="@/assets/duplicati-preview.svg" alt="Duplicati" class="img-fluid">
						</div>
					</div>

					<!-- <div class="row">
						<div class="col">
							<div class="apps-bg p-5">
								<h4 class="mb-3 text-center">Use Storj in Your Favourite Applications</h4>
								<p class="text-center">You can view and manage your files using the S3-compatible credentials below.</p>
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

					<div class="row p-0 py-4 px-md-5">
						<div class="col-12 col-lg-4 pt-5 px-5 px-md-3">
							<img src="@/assets/duplicati.svg" width="80" class="mb-3" alt="Duplicati">
							<h3>Duplicati</h3>
							<p class="mb-3">Free backup software to store encrypted backups on Storj.</p>
							<a href="https://www.duplicati.com/download" target="_blank" class="btn btn-primary px-5 py-2 mt-2 mb-4">Download</a>
							<p><a href="https://www.duplicati.com/" target="_blank" class="link">Visit Website</a></p>
						</div>

						<div class="col-12 col-lg-8 p-5 px-md-3">
							<div class="row mb-4">
								<div class="col text-left">
									<label class="label" for="stargate-endpoint" id="lbl-stargate-endpoint">S3 Compatible Endpoint</label>
									<input type="password" id="stargate-endpoint" class="form-control" autocomplete="off" v-model="this.$store.state.stargateEndpoint" disabled>
									<button v-on:click="copy($store.state.stargateEndpoint, 'endpointCopyText')" class="copy">{{endpointCopyText}}</button>
								</div>
							</div>

							<div class="row mb-4">
								<div class="col text-left">
									<label class="label" for="access-key" id="lbl-access-key">AWS Access ID</label>
									<input type="password" id="access-key" class="form-control" autocomplete="off" v-model="this.$store.state.stargateAccessKey" disabled>
									<button v-on:click="copy($store.state.stargateAccessKey, 'accessKeyCopyText')" class="copy">{{accessKeyCopyText}}</button>
								</div>
							</div>

							<div class="row mb-4">
								<div class="col text-left">

									<label class="label" for="secret-key" id="lbl-secret-key">AWS Access Key</label>
									<input type="password" id="secret-key" class="form-control" autocomplete="off" v-model="this.$store.state.stargateSecretKey" disabled>
									<button v-on:click="copy($store.state.stargateSecretKey, 'secretKeyCopyText')" class="copy">{{secretKeyCopyText}}</button>
								</div>
							</div>

							<div class="row mb-5">
								<div class="col text-left">
									<label class="label" for="bucket" id="lbl-bucket">Bucket</label>
									<input type="password" id="bucket" class="form-control" autocomplete="off" v-model="this.$store.state.stargateBucket" disabled>
									<button v-on:click="copy($store.state.stargateBucket, 'bucketCopyText')" class="copy">{{bucketCopyText}}</button>
								</div>
							</div>
						</div>
					</div>

					<div class="docs-bg rounded-bottom">
						<div class="row px-0 py-5 p-md-5">
							<div class="col-12 col-lg-4 pt-5 px-5 px-md-3">
								<h4 class="mb-4">Docs</h4>
								<div id="docs-nav" class="list-group">
									<a href="#docs-1" class="docs-link docs-link-active">Add Backup</a>
									<a href="#docs-2" class="docs-link">General backup settings</a>
									<a href="#docs-3" class="docs-link">Backup destination</a>
									<a href="#docs-4" class="docs-link">Source data</a>
									<a href="#docs-5" class="docs-link">Run First Backup</a>
								</div>
							</div>
							<div class="col-12 col-lg-8 p-5 px-md-3">

								<h4 class="mb-4" id="docs-1">Add Backup</h4>
								<p>Setting up Duplicati encrypted backups on Storj only takes 2 minutes. Navigate to <b>Add Backup</b> and <b>Configure a new Backup</b>. Click Next.</p>
								<img src="@/assets/duplicati/1.png" class="img-fluid mt-3 mb-5 rounded border shadow" alt="Create Backup">

								<h4 id="docs-2">General backup settings</h4>
								<p>Name your backup, select <b>AES-256 encryption, built in</b> for encryption, and pick a strong passphrase. <i>Note</i> : The backup will still function with the <b>No Encryption</b>, however we highly recommend you to use the encrypted option. Click Next.</p>
								<img src="@/assets/duplicati/2.png" class="img-fluid mt-3 mb-5 rounded border shadow" alt="Set Passphrase">

								<h4 id="docs-3">Backup destination</h4>
								<p>For <b>Storage Type</b> select <b>S3 Compatible</b>, check <b>Use SSL</b>, for <b>Server</b> select <b>Custom server url</b>, and copy-paste your <a href="#lbl-stargate-endpoint" class="link">S3 Compatible Endpoint</a> in the input box. Also copy-paste <a href="#lbl-bucket" class="link">Bucket</a> to your given <b>Bucket Name</b>, <a href="#lbl-access-key" class="link">Access Key</a> to <b>AWS Access ID</b>, and <a href="#lbl-secret-key" class="link">Secret Key</a> to <b>AWS Access Key</b>. You can enter anything you would like for <b>Folder path</b>, but we recommend something like backup.</p>
								<img src="@/assets/duplicati/3.png" class="img-fluid mt-3 mb-5 rounded border shadow" alt="Configure Backup">
								<p>Click <b>Test Connection</b>. When prompted if the bucket name should start with your username, click <b>No</b>.</p>
								<img src="@/assets/duplicati/4.png" class="img-fluid mt-3 mb-5 rounded border shadow" alt="Bucket Name">
								<p>You should see <b>Connection Worked!</b> If you see an error, please verify that the credentials were copied properly, or <a href="mailto:vortex@storj.io" class="font-weight-bold">contact support</a> for assistance. Click Next.</p>
								<img src="@/assets/duplicati/5.png" class="img-fluid mt-3 mb-5 rounded border shadow" alt="Success">

								<h4 id="docs-4">Source data</h4>
								<p>Select the folder or folders you would like to backup. In our example, we will backup our collection of cat pictures. Click Next.</p>
								<img src="@/assets/duplicati/6.png" class="img-fluid mt-3 mb-5 rounded border shadow" alt="Source Data">
								<p>You can then set a schedule for the backups. Click Next.</p>
								<img src="@/assets/duplicati/7.png" class="img-fluid mt-3 mb-5 rounded border shadow" alt="Backup Schedule">
								<p>You will then be able to set <b>Backup Retention</b>. We recommend that you leave remote volume size as is. Click <b>Save</b>.</p>
								<img src="@/assets/duplicati/8.png" class="img-fluid mt-3 mb-5 rounded border shadow" alt="Backup Retention">
								<p>You will be reminded to make a safe copy of your passphrase. <b>IF YOU LOSE YOUR PASSPHRASE YOUR DATA CANNOT BE RECOVERED</b>. So pretty please write it down and/or store your passphrase in a safe place.</p>
								<img src="@/assets/duplicati/9.png" class="img-fluid mt-3 mb-5 rounded border shadow" alt="Save Your Passphrase">

								<h4 id="docs-5">Run First Backup</h4>
								<p>Congratulations, you have successfully setup Duplicati with Storj. You may click <b>Run Now</b>, to start your first backup job. The backup will occur on the schedule that you have set.</p>
								<img src="@/assets/duplicati/10.png" class="img-fluid w-100 mt-3 rounded border shadow" alt="Run First Backup">

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
		endpointCopyText: "Copy",
		accessKeyCopyText: "Copy",
		secretKeyCopyText: "Copy",
		bucketCopyText: "Copy"
	}),
	methods: {
		async copy(text, field) {
			await navigator.clipboard.writeText(text);

			this[field] = "Copied!";

			await new Promise(r => setTimeout(r, 1000));

			this[field] = "Copy";
		}
	}
};
</script>
