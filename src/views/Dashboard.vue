<template>
<div>
	<div class="container">

		<ul class="nav nav-tabs nav-justified">
			<li class="nav-item">
				<router-link to="/dashboard/browser" class="nav-link" v-bind:class="tabStyles('/dashboard/browser')">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
						<path
						 d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
					</svg>
					File Browser
				</router-link>
			</li>
			<li class="nav-item">
				<router-link to="/dashboard/apps" class="nav-link" v-bind:class="tabStyles('/dashboard/apps')">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-window" viewBox="0 0 16 16">
						<path d="M2.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
						<path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm13 2v2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zM2 14a1 1 0 0 1-1-1V6h14v7a1 1 0 0 1-1 1H2z" />
					</svg>
					S3 &amp; Apps
				</router-link>
			</li>
			<li class="nav-item white-text">
				<router-link to="/dashboard/plan" class="nav-link" v-bind:class="tabStyles('/dashboard/plan')">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart" viewBox="0 0 16 16">
						<path
						 d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
					</svg>
					Usage &amp; Plan
				</router-link>
			</li>
		</ul>

		<div class="row">
			<div class="col-sm-12">
				<div v-if="$store.state.features.emailActivation === true && this.$store.state.activated === false" class="alert alert-warning" role="alert">
					Please activate your email.
				</div>
			</div>
		</div>

		<router-view></router-view>

	</div>

	<app-footer></app-footer>

</div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue';

export default {
	methods: {
		tabStyles(tab) {
			const currentTab = this.$router.history.current.path;
			if (currentTab === tab) {
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
	},
	async created() {
		await this.$store.dispatch('passiveLogin');

		if(this.isLoggedIn === false) {
			this.$router.push({path:'/'});
		}

		this.$store.dispatch('getUsage');
		this.$store.dispatch('files/list');
	}
}
</script>
