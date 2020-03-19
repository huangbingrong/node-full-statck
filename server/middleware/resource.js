const jwt = require('jsonwebtoken')

module.exports = options => {
	return async (req, res, next) => {
		// 把参数转换成单数的形式
		const inflection = require('inflection')
		req.Model = require(`../modules/${inflection.classify(
			req.params.resource
		)}`)
		next()
	}
}
