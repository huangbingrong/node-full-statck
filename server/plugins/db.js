module.exports = app => {
	const mongose = require('mongoose')
	mongose.connect('mongodb://localhost:27017/vueFullStack', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})

	// 把模块全部引用一遍
	require('require-all')(__dirname + '/../modules/')
}
