import Vue from 'vue'
import VueRouter from 'vue-router'
// 登陆
import Login from '../views/Login.vue'
// 主页面
import Main from '../views/Main.vue'
// 分类
import CategoriesCreate from '../views/CategoriesCreate.vue'
import CategoriesList from '../views/CategoriesList.vue'
// 商品
import GoodsCreate from '../views/GoodsCreate.vue'
import GoodsList from '../views/GoodsList.vue'
// 英雄
import HerosCreate from '../views/HerosCreate.vue'
import HerosList from '../views/HerosList.vue'
// 文章
import ArticleCreate from '../views/ArticleCreate.vue'
import ArticleList from '../views/ArticleList.vue'
// 广告
import AdCreate from '../views/AdCreate.vue'
import AdList from '../views/AdList.vue'
// 管理员
import AdminCreate from '../views/AdminCreate.vue'
import AdminList from '../views/AdminList.vue'
// 404
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
	// 登陆
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: { isPublic: true }
	},
	// 根路由
	{ path: '/', redirect: '/main' },
	{
		path: '/main',
		name: 'Main',
		component: Main,
		children: [
			// 分类路由
			{
				path: '/categories/create',
				name: 'CategoriesCreat',
				component: CategoriesCreate
			},
			{
				path: '/categories/create/:id',
				name: 'CategoriesEdit',
				component: CategoriesCreate,
				props: true
			},
			{
				path: '/categories/list',
				name: 'CategoriesList',
				component: CategoriesList
			},
			// 商品路由
			{
				path: '/goods/create',
				name: 'GoodsCreate',
				component: GoodsCreate
			},
			{
				path: '/goods/create/:id',
				name: 'GoodsCreate',
				component: GoodsCreate,
				props: true
			},
			{
				path: '/goods/list',
				name: 'GoodsList',
				component: GoodsList
			},
			// 英雄路由
			{
				path: '/heros/create',
				name: 'HerosCreate',
				component: HerosCreate
			},
			{
				path: '/heros/create/:id',
				name: 'HerosCreate',
				component: HerosCreate,
				props: true
			},
			{
				path: '/heros/list',
				name: 'HerosList',
				component: HerosList
			},
			// 文章路由
			{
				path: '/article/create',
				name: 'ArticleCreate',
				component: ArticleCreate
			},
			{
				path: '/article/create/:id',
				name: 'ArticleCreate',
				component: ArticleCreate,
				props: true
			},
			{
				path: '/article/list',
				name: 'ArticleList',
				component: ArticleList
			},
			// 广告路由
			{
				path: '/ad/create',
				name: 'AdCreate',
				component: AdCreate
			},
			{
				path: '/ad/create/:id',
				name: 'AdCreate',
				component: AdCreate,
				props: true
			},
			{
				path: '/ad/list',
				name: 'AdList',
				component: AdList
			},
			// 管理员路由
			{
				path: '/admin/create',
				name: 'AdminCreate',
				component: AdminCreate
			},
			{
				path: '/admin/create/:id',
				name: 'AdminCreate',
				component: AdminCreate,
				props: true
			},
			{
				path: '/admin/list',
				name: 'AdminList',
				component: AdminList
			}
		]
	},
	// 404 路由
	{ path: '*', name: '404', component: NotFound }
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

// router 路由守卫
router.beforeEach((to, from, next) => {
	if (!to.meta.isPublic && !localStorage.token) return next('/login')
	next()
})

export default router
