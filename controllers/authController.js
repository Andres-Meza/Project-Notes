const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
	const { username, password } = req.body

	try {
		const userExist = await userModel.exists({ username })

		if (userExist) {
			return res.status(400).json({ message: 'Username already exists' })
		}

		const newUser = new userModel({ username, password })
		await newUser.save()

		const token = jwt.sign({ id: newUser._id }, 'secretKey', { expiresIn: '1h' })
		res.status(201).json({ message: 'User registered successfully', token })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.loginUser = async (req, res) => {
	const { username, password } = req.body

  try {
    const user = await userModel.findOne({ username })
		
    if (!user) {
			return res.status(400).json({ message: 'Invalid username or password' })
    }

		const isMatch = await user.comparePassword(password)
		
		if (!isMatch){
			return res.status(400).json({ message: 'User account has been locked due to too many failed login attempts' })
		}

		const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '3h' })

    res.status(200).json({ message: 'User logged in successfully', token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}