const jwt = require('jsonwebtoken')
const Admin = require('../modules/Admin')

module.exports = options => {
	return async (req, res, next) => {
		// 用户 token
		const token = String(req.headers.authorization || '')
			.split(' ')
			.pop()
		// 判断 token 是否存在
		if (!token)
			return res.status(422).json({
				message: null,
				meta: { msg: '请先登陆', status: 422 }
			})
		// 存在 解析并验证 token
		const tokenData = jwt.verify(token, req.app.get('secret'))
		// 根据 token 解析的 id 获取用户信息
		const adminObj = Admin.findById(tokenData._id)
		// 判断用户是否存在
		if (!adminObj)
			return res.status(422).json({
				message: null,
				meta: { msg: '请先登陆', status: 422 }
			})
		await next()
	}
}
