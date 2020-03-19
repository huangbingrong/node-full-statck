import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '../../router/index'

let loading
// 开始加载动画
function startLoadin() {
	loading = Loading.service({
		text: '拼命加载中',
		lock: true,
		background: 'rgba(0,0,0,0.3)'
	})
}

// 结束加载动画
function endLoadin() {
	loading.close()
}

// 创建 axios 实例配置对象

const http = axios.create({
	// 动态的配置访问地址
	baseURL: process.env.VUE_APP_API_URL || '/admin/api'
	// baseURL: 'http://localhost:3000/admin/api'
})

// 请求拦截
http.interceptors.request.use(
	config => {
		startLoadin()
		// 获取 token
		const token = localStorage.token || ''
		// 判断 token 是否存在
		if (token) {
			// 配置请求头
			config.headers.Authorization = token
		}
		return config
	},
	error => {
		endLoadin()
		return Promise.reject(error)
	}
)

// 响应拦截
http.interceptors.response.use(
	response => {
		endLoadin()
		return response
	},
	error => {
		endLoadin()
		Message.error(error.response.data.meta.msg)
		// 发生错误跳转到登陆页
		router.push('/login')
		return Promise.reject(error)
	}
)

export default http
