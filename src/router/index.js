import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
<<<<<<< HEAD
	{
		path: '/',
		name: 'Home',
		component: Home
	}
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
});
=======
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = new VueRouter({
  routes
})
>>>>>>> parent of 92557b7a (start of refactor)

export default router;
