const mongoose = require('mongoose')

const newAd = new mongoose.Schema({
	name: { type: String },
	ad: [
		{
			url: { type: String },
			img: { type: String }
		}
	],
	date: { type: Date, default: Date.now() }
})

module.exports = Ad = mongoose.model('Ad', newAd)
