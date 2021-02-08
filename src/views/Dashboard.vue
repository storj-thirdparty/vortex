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
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z" />
						<path
						 d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
					</svg>
					Backup with Duplicati
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
			if (loggedIn === false) {
				this.$router.push({
					path: '/'
				});
			}
		}
	},
	components: {
		AppFooter,
	},
	async created() {
		await this.$store.dispatch('passiveLogin');

		if (this.isLoggedIn === false) {
			this.$router.push({
				path: '/'
			});
		}

		this.$store.dispatch('getUsage');
		this.$store.dispatch('files/list');
	}
}
</script>
