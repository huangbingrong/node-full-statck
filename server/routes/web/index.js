module.exports = app => {
	const express = require('express')
	const router = express.Router()
	const Category = require('../../modules/Category')
	const Article = require('../../modules/Article')
	const Hero = require('../../modules/Hero')
	const data = require('../../plugins/data')

	/* 插入新闻分类接口 */
	router.get('/insert/categories', async (req, res) => {
		const parent = await Category.findOne({
			name: '新闻分类'
		})

		// 获取父级分类是 '新闻分类' 的分类
		const categories = await Category.find()
			.where({
				parent
			})
			.lean()

		const newsTitle = data.categories

		// 拼接一个 文章标题 列表
		const newsList = newsTitle.map(title => {
			// 打乱分类数组中的每项
			const newCategory = categories
				.slice(0)
				.sort((a, b) => Math.random() - 0.5)

			return {
				title,
				categories: newCategory.slice(0, 2)
			}
		})

		// 存入数据库
		await Article.deleteMany({})
		await Article.insertMany(newsList)

		res.json({
			newsList
		})
	})

	/* 
    @router GET /web/api/news/list
    @desc 获取新闻分类接口
    @access public
  */
	router.get('/news/list', async (req, res) => {
		// 获取新闻分类
		const newsCate = await Category.findOne({
			name: '新闻分类'
		})
		// const newsList = await Category.find(newsCate)
		// 	.populate({
		// 		path: 'children',
		// 		populate: {
		// 			path: 'newsList'
		// 		}
		// 	})
		// 	.lean()

		// 根据新闻分类获取新闻分类的子分类
		const cateList = await Category.aggregate([
			{ $match: { parent: newsCate._id } },
			{
				$lookup: {
					from: 'articles',
					localField: '_id',
					foreignField: 'categories',
					as: 'newsList'
				}
			},
			{ $addFields: { newsList: { $slice: ['$newsList', 5] } } }
		])

		// 给新闻资讯列表拼接一个热门分类
		cateList.unshift({
			name: '热门',
			newsList: await Article.find()
				.where({
					// categores 必须关联新闻分类下的子分类
					categories: { $in: cateList.map(v => v._id) }
				})
				.populate('categories')
				.limit(5)
				.lean()
		})

		// 为每个分类添加一个分类名称
		cateList.map(cate => {
			cate.newsList.map(news => {
				news.categoriesName =
					cate.name === '热门' ? news.categories[0].name : cate.name
				return news
			})
			return cate
		})

		res.json({
			message: cateList,
			meta: {
				msg: '获取成功',
				status: 200
			}
		})
	})

	/* 插入英雄分类接口 */
	router.get('/insert/heroes', async (req, res) => {
		await Hero.deleteMany({})

		const rawData = data.hero
		// 遍历数组插入数据
		for (let cat of rawData) {
			if (cat.name === '热门') {
				// 热门数据不录入
				continue
			}

			// 获取指定 categories 分类数据
			const category = await Category.findOne({
				name: cat.name
			})

			// 遍历英雄列表
			cat.heroes = cat.heroes.map(hero => {
				hero.categories = [category]
				return hero
			})
			// 录入英雄
			await Hero.insertMany(cat.heroes)
		}
		const heroes = await Hero.find()
		res.json(heroes)
	})

	/* 
    @router GET /web/api/heroes/list
    @desc 获取英雄分类接口
    @access public
  */
	router.get('/heroes/list', async (req, res) => {
		// 获取英雄分类
		const heroCate = await Category.findOne({
			name: '英雄分类'
		})
		// 根据英雄分类获取英雄子分类
		const cateList = await Category.aggregate([
			{ $match: { parent: heroCate._id } },
			{
				$lookup: {
					from: 'heroes',
					localField: '_id',
					foreignField: 'categories',
					as: 'heroesList'
				}
			}
		])
		// 给英雄列表拼接一个热门
		cateList.unshift({
			name: '热门',
			heroesList: await Hero.find()
				.limit(20)
				.lean()
		})

		res.json({
			message: cateList,
			meta: {
				mes: '获取成功',
				status: 200
			}
		})
	})

	/* 
    @router GET /web/api/article/:id
    @desc 获取文章详情接口
    @access public
  */
	router.get('/article/:id', async (req, res) => {
		let article = await Article.findById(req.params.id).lean()
		article.information = await Article.find()
			// 找和这篇文章相关的文章
			.where({
				categories: { $in: article.categories }
			})
			.limit(2)
			.lean()

		res.json({
			message: article,
			meta: {
				msg: '获取成功',
				status: 200
			}
		})
	})

	/* 
    @router GET /web/api/hero/:id
    @desc 获取英雄详情接口
    @access public
  */
	router.get('/hero/:id', async (req, res) => {
		const hero = await Hero.findById(req.params.id)
			.populate('categories partners.hero goods1 goods2')
			.lean()
		res.json({
			message: hero,
			meta: {
				msg: '获取成功',
				status: 200
			}
		})
	})

	app.use('/web/api', router)
}
