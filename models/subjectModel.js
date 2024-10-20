const mongoose = require('mongoose')
const Schema = mongoose.Schema


const subjectSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	grade: {
		type: Number,
		required: true
	},
	students: [{
		type: Schema.Types.ObjectId,
		ref: 'student'
	}],
	teacher: {
		type: String,
		required: true
	}
})

const subject = mongoose.model('subject', subjectSchema)

module.exports = subject