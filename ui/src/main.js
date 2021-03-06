import Vue from "vue";
import Router from "vue-router";
import Vuex from "vuex";
import axios from "axios";
import S3 from "aws-sdk/clients/s3";

import { FileBrowser } from "browser";

import App from "./App.vue";
import Home from "./views/Home.vue";
import Admin from "./views/Admin.vue";
import Dashboard from "./views/Dashboard.vue";
import Apps from "./components/Apps.vue";
import Usage from "./components/Usage.vue";
import NotFound from "./components/NotFound.vue";

import { files } from 'browser';

Vue.use(Router);
Vue.use(Vuex);

Vue.config.productionTip = false;

const routes = [
	{
		path: "/",
		component: Home
	},
	{
		path: "/admin",
		component: Admin
	},
	{
		path: "/app",
		component: Dashboard,
		children: [
			/*{
			path: "",
			redirect: "browser"
		},*/
			{
				path: "browser",
				component: FileBrowser,
				children: [
					{
						path: "*",
						component: FileBrowser
					}
				]
			},
			{
				path: "apps",
				component: Apps
			},
			{
				path: "plan",
				component: Usage
			}
		]
	},
	{
		path: "/404",
		name: "404",
		component: NotFound,
		props: true
	},
	{
		path: "*",
		component: NotFound
	}
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export const router = new Router({
	routes, // Short for `routes: routes`,
	mode: "history"
});

const store = new Vuex.Store({
	state: {
		userError: null,
		email: null,
		stargateAccessKey: null,
		stargateSecretKey: null,
		stargateBucket: null,
		stargateEndpoint: null,
		activated: null,
		planId: null,
		s3: null,
		features: {},
		plans: null,
		usage: null,
		openedDropdown: null,
		createFolderInputShow: false
	},
	getters: {
		isLoggedIn(state) {
			return typeof state.stargateAccessKey === "string";
		}
	},
	modules: {
		files
	},
	mutations: {
		setCreateFolderInputShow(state, value) {
			state.createFolderInputShow = value;
		},
		setOpenedDropdown(state, id) {
			state.openedDropdown = id;
		},

		setUserError(state, error) {
			state.userError = error;
		},

		setUser(
			state,
			{
				email,
				stargateAccessKey,
				stargateSecretKey,
				stargateBucket,
				stargateEndpoint,
				activated,
				planId,
				features,
				plans
			}
		) {
			state.email = email;
			state.stargateAccessKey = stargateAccessKey;
			state.stargateSecretKey = stargateSecretKey;
			state.stargateBucket = stargateBucket;
			state.stargateEndpoint = stargateEndpoint;
			state.activated = activated;
			state.planId = planId;
			state.userError = null;
			state.features = features;
			state.plans = plans;

			state.s3 = new S3({
				accessKeyId: stargateAccessKey,
				secretAccessKey: stargateSecretKey,
				endpoint: stargateEndpoint,
				s3ForcePathStyle: true,
				signatureVersion: "v4"
			});
		},

		setUsage(state, usage) {
			state.usage = usage;
		}
	},
	actions: {
		openDropdown({ commit, dispatch }, id) {
			if (id !== "FileBrowser") {
				dispatch("files/clearAllSelectedFiles", { root: true });
			}
			commit("setOpenedDropdown", id);
		},

		async signUp({ commit }, { email, password, termsAndConditions }) {
			const { data } = await axios.post("/api/signup", {
				email,
				password,
				termsAndConditions
			});

			if (data.error) {
				commit("setUserError", data.error);
			} else {
				commit("setUser", data);
			}
		},

		async login({ commit }, { email, password }) {
			const { data } = await axios.post("/api/login", {
				email,
				password
			});

			if (data.error) {
				commit("setUserError", data.error);
			} else {
				commit("setUser", data);
			}
		},

		async passiveLogin({ commit }) {
			console.log('passive login');
			const { data } = await axios.post("/api/passive-login");

			console.log('passive login', data);
		
			commit('files/init', {
				endpoint: data.stargateEndpoint,
				accessKey: data.stargateAccessKey,
				secretKey: data.stargateSecretKey,
				bucket: data.stargateBucket,
				browserRoot: "/app/browser/"
			});

			if (!data.error) {
				commit("setUser", data);
			}
		},

		async logout({ commit }) {
			await axios.post("/api/logout");

			commit("setUser", {
				email: null,
				stargateAccessKey: null,
				stargateSecretKey: null,
				stargateBucket: null,
				stargateEndpoint: null,
				activated: null
			});
		},

		async getUsage({ commit }) {
			const { data } = await axios.post("/api/usage");

			commit("setUsage", data);
		},

		updateCreateFolderInputShow({ commit }, value) {
			commit("setCreateFolderInputShow", value);
		}
	}
});

new Vue({
	render(h) {
		return h(App);
	},
	router,
	store
}).$mount("#app");
