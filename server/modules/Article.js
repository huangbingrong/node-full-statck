const mongoose = require('mongoose')

const newArticle = mongoose.Schema(
	{
		categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
		title: { type: String },
		body: { type: String }
	},
	{
		timestamps: true
	}
)

module.exports = Article = mongoose.model('Article', newArticle)
