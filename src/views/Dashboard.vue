<template>
<div>
	<div class="container">

		<ul class="nav nav-tabs nav-justified">
			<li class="nav-item">
				<a class="nav-link" v-bind:class="tabStyles('file-browser')" v-on:click="selectedTab = 'file-browser'" href="javascript:null">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
						<path
						 d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
					</svg>
					File Browser
				</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" v-bind:class="tabStyles('apps')" v-on:click="selectedTab = 'apps'" href="javascript:null">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-window" viewBox="0 0 16 16">
						<path d="M2.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
						<path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm13 2v2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zM2 14a1 1 0 0 1-1-1V6h14v7a1 1 0 0 1-1 1H2z" />
					</svg>
					S3 &amp; Apps
				</a>
			</li>
			<li class="nav-item white-text">
				<a class="nav-link" v-bind:class="tabStyles('usage')" v-on:click="selectedTab = 'usage'" href="javascript:null">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart" viewBox="0 0 16 16">
						<path
						 d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
					</svg>
					Usage &amp; Plan
				</a>
			</li>
		</ul>

		<div class="row">
			<div class="col-sm-12">
				<div v-if="$store.state.features.emailActivation === true && this.$store.state.activated === false" class="alert alert-warning" role="alert">
					Please activate your email.
				</div>
			</div>
		</div>

		<div class="row" v-if="selectedTab === 'file-browser'">
			<div class="col-sm-12">
				<div class="card border-0 p-4 p-lg-5 mb-5" style="border-top-left-radius: 0;">
					<file-browser></file-browser>
				</div>
			</div>
		</div>


		<apps v-if="selectedTab === 'apps'"></apps>

		<div class="card border-0 p-4 p-lg-5 mb-5" v-if="selectedTab === 'usage'">
			<usage></usage>
		</div>

	</div>

	<app-footer></app-footer>

</div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue';
import FileBrowser from '../components/FileBrowser.vue';
import Usage from '../components/Usage.vue';
import Apps from '../components/Apps.vue';

export default {
	data: () => ({
		selectedTab: 'file-browser'
	}),
	methods: {
		tabStyles(tab) {
			if (this.selectedTab === tab) {
				return {
					active: true,
				};
			}
		}
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isLoggedIn;
		}
	},
	watch: {
		isLoggedIn(loggedIn) {
			if(loggedIn === false) {
				this.$router.push({path:'/'});
			}
		}
	},
	components: {
		AppFooter,
		FileBrowser,
		Usage,
		Apps
	},
	created() {
		if(this.isLoggedIn === false) {
			this.$router.push({path:'/'});
		}
	}
}
</script>
