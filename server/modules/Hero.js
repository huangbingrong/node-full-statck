const mongoose = require('mongoose')

const newHero = new mongoose.Schema({
	name: { type: String },
	avatar: { type: String },
	banner: { type: String },
	date: { type: Date, default: Date.now() },
	title: { type: String },
	categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
	scores: {
		difficult: { type: Number },
		skill: { type: Number },
		attack: { type: Number },
		exist: { type: Number }
	},
	skills: [
		{
			name: { type: String },
			icon: { type: String },
			delay: { type: String },
			cost: { type: String },
			description: { type: String },
			tips: { type: String }
		}
	],
	goods1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Good' }],
	goods2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Good' }],
	usage: { type: String },
	compete: { type: String },
	team: { type: String },
	partners: [
		{
			hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
			introduce: { type: String }
		}
	]
})

module.exports = Hero = mongoose.model('Hero', newHero, 'heroes')
