const subjectModel = require('../models/subjectModel')

exports.getSubject = async (req, res) => {
	try {
		const subjects = await subjectModel.find().populate('students')
		console.log('Get Subject Function')
		res.status(200).json(subjects)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.createSubjects = async (req, res) => {
	try {
		const newSubject = new subjectModel(req.body)
		await newSubject.save()
		console.log('Create Subject Function')
		res.status(201).json(newSubject)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.getSubjectById = async (req, res) => {
	try {
		const idSubject = req.params.idSubject
		const subject = await subjectModel.findById(idSubject).populate('students')

		if (!subject) {
			return res.status(404).json({ message: 'Subject not found' })
		}
		console.log(`Get Subject by ID Function: ${idSubject} `)
		res.status(200).json(subject)

	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.updateSubject = async (req, res) => {
	try {
		const idSubject = req.params.idSubject
		const updatedSubject = await subjectModel.findByIdAndUpdate(idSubject, req.body, { new: true })
		if (!updatedSubject) {
			return res.status(404).json({ message: 'Subject not found' })
		}
		console.log(`Update Subject by ID Function: ${idSubject} `)
		res.status(200).json(updatedSubject)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.deleteSubject = async (req, res) => {
	try {
		const idSubject = req.params.idSubject
		const subjectDelete = await subjectModel.findByIdAndDelete(idSubject)

		if (!subjectDelete) {
			return res.status(404).json({ message: 'Subject not found' })
		}

		console.log(`Delete Subject by ID Function: ${idSubject} `)
		res.status(200).json({ message: `Subject by id: ${idSubject} deleted successfully` })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}