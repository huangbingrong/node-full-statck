const mongoose = require('mongoose')

const newGood = new mongoose.Schema({
	name: { type: String },
	icon: { type: String },
	date: { type: Date, default: Date.now() }
})

module.exports = Good = mongoose.model('Good', newGood)
