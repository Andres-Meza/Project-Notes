const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema ({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
})

userSchema.pre('save' , async function(next) {
	if (!this.isModified('password')){
		return next()
	}
	try{
		const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
		next()
	} catch (error){
		next(new Error('Password encryption failed'))
	}
})

userSchema.methods.comparePassword = async function(enteredPassword) {
	return await bcrypt.compare(enteredPassword , this.password)
}

const user = mongoose.model('user' , userSchema)

module.exports = user