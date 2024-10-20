const mongoose = require('mongoose')

const studientSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	certificate: {
		type: Boolean,
		required: true,
		default: false
	},
})

module.exports = mongoose.model('student', studientSchema)

