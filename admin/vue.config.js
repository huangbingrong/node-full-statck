module.exports = {
	// 配置把打包的文件输出到那个目录
	outputDir: __dirname + '/../server/public/admin',
	// 配置生产环境下要打包文件引用的地址以什么（/admin/)开头
	publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/'
}
