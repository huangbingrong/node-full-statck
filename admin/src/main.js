import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './assets/js/http'
import './assets/css/common.css'
import moment from 'moment'

// 定义全局的时间过滤器
Vue.filter('dateFormat', (dateStr, format = 'YYY-MM-DD hh:mm:ss') => {
	return moment(dateStr).format(format)
})

// 原型上添加一个 axios 请求方法
Vue.prototype.$http = http

Vue.use(ElementUI)

Vue.config.productionTip = false

// 定义一个全局的 vue 实例
Vue.mixin({
	computed: {
		uploadUrl() {
			return this.$http.defaults.baseURL + '/upload'
		}
	},
	methods: {
		setHeaders() {
			return {
				Authorization: localStorage.token
			}
		}
	}
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
