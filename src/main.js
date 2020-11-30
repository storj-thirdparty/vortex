import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import Home from './views/Home.vue';
import Admin from './views/Admin.vue';

Vue.config.productionTip = false;

Vue.use(Router);

const routes = [{
	path: '/',
	component: Home
}, {
	path: '/admin',
	component: Admin
}];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new Router({
	routes // Short for `routes: routes`
});

new Vue({
	render(h) {
		return h(App);
	},
	router
}).$mount('#app');
