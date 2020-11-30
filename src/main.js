import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [{
	path: '/foo',
	component: Foo
},
{
	path: '/bar',
	component: Bar
}];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
	routes // Short for `routes: routes`
});

new Vue({
	render(h) {
		return h(App);
	},
	router
}).$mount('#app');
