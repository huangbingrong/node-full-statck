import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'
import Heroes from '../views/Heroes.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: Main,
		children: [
			{ path: '/', name: 'Home', component: Home },
			{
				path: '/article/:id',
				name: 'Article',
				component: Article,
				props: true
			}
		]
	},
	{ path: '/heroes/:id', name: 'Heroes', component: Heroes, props: true }
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
