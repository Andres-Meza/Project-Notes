const studentModel = require("../models/studentModel")

exports.getStudent = async (req, res) => {
	try {
		const students = await studentModel.find()
		console.log('Get Student Function')
		res.status(200).json(students)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.createStudents = async (req, res) => {
	console.log(req.body)
	try {
		const newStudent = new studentModel(req.body)
		await newStudent.save()
		console.log('Create Student Function')
		res.status(201).json(newStudent)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.getStudentById = async (req, res) => {
	try {
		const idStudent = req.params.idStudent
		const student = await studentModel.findById(idStudent)

		if (!student) {
			return res.status(404).json({ message: 'Student not found' })
		}
		console.log(`Get Student by ID Function: ${idStudent} `)
		res.status(200).json(student)

	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.updateStudent = async (req, res) => {
	try {
		const idStudent = req.params.idStudent
		const updatedStudent = await studentModel.findByIdAndUpdate(idStudent, req.body, { new: true });

		if (!updatedStudent) {
			return res.status(404).json({ message: 'Student not found' })
		}
		
		res.status(200).json(updatedStudent)
		console.log(`Update Student by ID Function: ${idStudent} `)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.deleteStudent = async (req, res) => {
	try {
		const idStudent = req.params.idStudent
		const deleteStudent = await studentModel.findByIdAndDelete(idStudent)

		if (!deleteStudent) {
			return res.status(404).json({ message: 'Student not found' })
		}
		console.log(`Delete Student by ID Function: ${idStudent} `)
		res.status(200).json({ message: `Student by id: ${idStudent} deleted successfully` })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}