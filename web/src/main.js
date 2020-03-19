import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/common.min.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Card from './components/Card.vue'
import CardList from './components/CardList.vue'
import './assets/css/iconfont.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)

Vue.component('c-card', Card)
Vue.component('c-cardList', CardList)

Vue.use(MintUI)

Vue.config.productionTip = false

console.log(process.env)
Vue.prototype.$http = axios.create({
	baseURL: process.env.VUE_APP_API_URL || '/web/api'
	// baseURL: 'http://localhost:3000/web/api'
})

Vue.filter('dateFormat', (dateStr, formate = 'MM-DD') => {
	return require('moment')(dateStr).format(formate)
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
