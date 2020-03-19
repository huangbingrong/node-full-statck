const mongoose = require('mongoose')

const newCategory = new mongoose.Schema({
	name: { type: String },
	date: { type: Date, default: Date.now() },
	parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

newCategory.virtual('children', {
	localField: '_id',
	foreignField: 'parent',
	justOne: false,
	ref: 'Category'
})

newCategory.virtual('newsList', {
	localField: '_id',
	foreignField: 'categories',
	justOne: false,
	ref: 'Article'
})

module.exports = Category = mongoose.model('Category', newCategory)
