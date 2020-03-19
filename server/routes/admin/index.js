module.exports = app => {
	const express = require('express')
	const bcrypt = require('bcrypt')
	const jwt = require('jsonwebtoken')
	const authMiddleware = require('../../middleware/auth')
	const resourceMiddleware = require('../../middleware/resource')
	const router = express.Router({
		// 合并参数 子路由可以访问
		mergeParams: true
	})

	/*
  @desc 动态接口
  */

	/* 
    @router POST admin/api/reset/:resource
    @desc 创建数据接口
    @access private
  */
	router.post('/', async (req, res) => {
		const result = await req.Model.create(req.body)
		res.json({
			message: result,
			meta: {
				msg: '创建成功',
				status: 201
			}
		})
	})

	/* 
    @router GET admin/api/reset/:resource
    @desc 获取数据接口
    @access private
  */
	router.get('/', authMiddleware(), async (req, res) => {
		const queryOptions = {}
		if (req.Model.modelName === 'Category') {
			queryOptions.populate = 'parent'
		}
		// setOptions 可选参数
		const result = await req.Model.find().setOptions(queryOptions)
		res.json({
			message: result,
			meta: {
				msg: '获取成功',
				status: 200
			}
		})
	})

	/* 
    @router GET admin/api/reset/:resource/:id
    @desc 根据id查找数据接口
    @access private
  */
	router.get('/:id', async (req, res) => {
		const result = await req.Model.findById(req.params.id)
		res.json({
			message: result,
			meta: {
				msg: '查找成功',
				status: 200
			}
		})
	})

	/* 
    @router PUT admin/api/reset/:resource/:id
    @desc 根据id编辑数据接口
    @access private
  */
	router.put('/:id', async (req, res) => {
		const result = await req.Model.findByIdAndUpdate(
			req.params.id,
			req.body
		)
		res.json({
			message: result,
			meta: {
				msg: '编辑成功',
				status: 200
			}
		})
	})

	/* 
    @router DELETE admin/api/reset/:resource/:id
    @desc 删除数据接口
    @access private
  */
	router.delete('/:id', async (req, res) => {
		const result = await req.Model.findByIdAndRemove(req.params.id)
		res.json({
			message: result,
			meta: {
				msg: '删除成功',
				status: 204
			}
		})
	})

	/* 
    @router POST GET DELETE PUT  '/admin/api/reset/:resource'
    @desc 配置动态路由中间件
    @access private
  */
	app.use('/admin/api/reset/:resource', resourceMiddleware(), router)

	/* 
    @router PUT admin/api/admin/create/:id
    @desc 修改管理员信息
    @access private
  */
	app.put('/admin/api/admin/create/:id', async (req, res) => {
		const Admin = require('../../modules/Admin')
		// 获取要编辑的用户信息
		const adminObj = await Admin.findById(req.params.id)
		// 解析用户原密码并验证
		const checkedPass = bcrypt.compareSync(
			req.body.password,
			adminObj.password
		)
		if (!checkedPass)
			// 验证失败
			return res.json({
				message: null,
				meta: {
					msg: '原密码错误',
					status: 422
				}
			})
		if (req.body.password === req.body.password2)
			// 新密码和原密码一致
			return res.json({
				message: null,
				meta: {
					msg: '新密码和原密码一致',
					status: 422
				}
			})
		// 验证成功
		// 重新拼接一个数据对象
		const formData = {
			name: req.body.name,
			avarta: req.body.avarta,
			password: req.body.password2
		}
		const result = await Admin.findByIdAndUpdate(req.params.id, formData)
		res.json({
			message: result,
			meta: {
				msg: '编辑成功',
				status: 200
			}
		})
	})

	/* 
    @router POST admin/api/login
    @desc 登陆接口
    @access public
  */
	app.post('/admin/api/login', async (req, res) => {
		const Admin = require('../../modules/Admin')
		const { name, password } = req.body
		// 根据 name 查找用户信息
		const adminObj = await Admin.findOne({ name })
		// 判断用户是否存在
		if (!adminObj)
			// 不存在
			return res.status(422).json({
				message: null,
				meta: {
					msg: '用户或密码错误！',
					status: 422
				}
			})
		// 存在
		// 校验密码是否正确
		const isValid = bcrypt.compareSync(password, adminObj.password)
		if (!isValid)
			// 校验失败
			return res.status(422).json({
				message: null,
				meta: {
					msg: '用户或密码错误！',
					status: 422
				}
			})
		// 校验成功
		// token数据源
		const playload = { id: adminObj._id, name: adminObj.name }
		// 生成 token
		const token = 'Bearer ' + jwt.sign(playload, app.get('secret'))
		res.json({
			message: null,
			meta: {
				msg: '登陆成功',
				status: 200
			},
			token
		})
	})

	/* 
    @router POST admin/api/upload
    @desc 上传图片接口
    @access private
  */
	const multer = require('multer')
	const upload = multer({ dest: __dirname + '/../../uploads' })
	app.post(
		'/admin/api/upload',
		authMiddleware(),
		upload.single('file'),
		async (req, res) => {
			// 获取前端传过来的图片信息
			const file = req.file
			// 拼接一个本地图标路径
			file.icon = 'http://localhost:3000/uploads/' + req.file.filename
			res.json(file)
		}
	)
}
