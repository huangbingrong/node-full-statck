const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const newAdmin = new mongoose.Schema({
	name: { type: String },
	avatar: { type: String },
	password: {
		type: String,
		set(val) {
			return bcrypt.hashSync(val, 10)
		}
	},
	date: { type: Date, default: Date.now() }
})

module.exports = Admin = mongoose.model('Admin', newAdmin)
