const studentModel = require('../models/studentModel')
const studentController = require('../controllers/studentController')

jest.mock('../models/studentModel')

describe('getStudent', () => {
	it('should return a student object', async () => {
		const request = {}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		studentModel.find.mockResolvedValue([{
			name: 'Mario Lopez',
			age: 30,
			certificate: true
		}])

		await studentController.getStudent(request, response)

		expect(response.status).toHaveBeenCalledWith(200)
		expect(response.json).toHaveBeenCalledWith([{
			name: 'Mario Lopez',
			age: 30,
			certificate: true
		}])
	})

	it('should return an error if there is a problem with the database', async () => {
		const request = {}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		studentModel.find.mockRejectedValue(new Error('Database error'))

		await studentController.getStudent(request, response)

		expect(response.status).toHaveBeenCalledWith(500)
		expect(response.json).toHaveBeenCalledWith({ error: 'Database error' })
	})
})

// ... other test cases for getStudent, getStudentById, createStudent, updateStudent, and deleteStudent ...
describe('Create Students', () => {
	it('should create a new student', async () => {
		const request = {
			body: {
				name: 'Mario Lopez',
				age: 30,
				certificate: true
			}
		}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		studentModel.prototype.save = jest.fn().mockResolvedValue({
			name: 'Mario Lopez',
			age: 30,
			certificate: true,
			_id: "670aa790c90a8fd4f8a406c4",
			__v: 0
		})

		await studentController.createStudents(request, response)

		expect(response.status).toHaveBeenCalledWith(201)
		// expect(response.json).toHaveBeenCalledWith({
		// 	name: 'Mario Lopez',
		// 	age: 30,
		// 	certificate: true,
		// 	_id: '670aa790c90a8fd4f8a406c4',
		// 	__v: 0,
		// });
	})
})

describe('Get Students For ID', () => {
	it('should return a student by ID', async () => {
		const request = {
			params: {
				idStudent: '670aa790c90a8fd4f8a406c4'
			}
		}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		studentModel.findById.mockResolvedValue({
			name: 'Mario Lopez',
			age: 30,
			certificate: true,
			_id: '670aa790c90a8fd4f8a406c4',
			__v: 0,
		})

		await studentController.getStudentById(request, response)

		expect(response.status).toHaveBeenCalledWith(200)
		expect(response.json).toHaveBeenCalledWith({
			name: 'Mario Lopez',
			age: 30,
			certificate: true,
			_id: '670aa790c90a8fd4f8a406c4',
			__v: 0,
		})
	})

	it('should return an error if the student does not exist', async () => {
		const request = {
			params: {
				idStudent: '670aa790c90a8fd4f8a406c5'
			}
		}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		studentModel.findById.mockResolvedValue(null)

		await studentController.getStudentById(request, response)

		expect(response.status).toHaveBeenCalledWith(404)
		expect(response.json).toHaveBeenCalledWith({ message: 'Student not found' })
	})

	it('Should return 500 error get Students', async () => {
		const request = {
			params: {
				idStudent: '670aa790c90a8fd4f8a406c5'
			}
		}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		studentModel.findById.mockRejectedValue(new Error('Database error'))

		await studentController.getStudentById(request, response)

		expect(response.status).toHaveBeenCalledWith(500)
		expect(response.json).toHaveBeenCalledWith({ error: 'Database error' })
	})
})

describe('Update Student', () => {
	it('should update a student by ID', async () => {
		const request = {
			params: {
				idStudent: '670aa790c90a8fd4f8a406c4'
			},
			body: {
				name: 'Mario Lopez Updated',
				age: 31,
				certificate: false
			}
		}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		studentModel.findByIdAndUpdate.mockResolvedValue({
			name: 'Andres Meza',
			age: 20,
			certificate: true,
			_id: '670aa790c90a8fd4f8a406c4',
			__v: 0,
		})

		await studentController.updateStudent(request, response)

		expect(response.status).toHaveBeenCalledWith(200)
		expect(response.json).toHaveBeenCalledWith({
			name: 'Andres Meza',
			age: 20,
			certificate: true,
			_id: '670aa790c90a8fd4f8a406c4',
			__v: 0,
		})
	})

	it('should return an error if the student does not exist', async () => {
		const request = {
			params: {
				idStudent: '670aa790c90a8fd4f8a406c5'
			},
			body: {
				name: 'Mario Lopez Updated',
				age: 31,
				certificate: false
			}
		}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		studentModel.findByIdAndUpdate.mockResolvedValue(null)

		await studentController.updateStudent(request, response)

		expect(response.status).toHaveBeenCalledWith(404)
		expect(response.json).toHaveBeenCalledWith({ message: 'Student not found' })
	})

	it('should return 500 error update Student', async () => {
		const request = {
			params: {
				idStudent: '670aa790c90a8fd4f8a406c5'
			},
			body: {
				name: 'Mario Lopez Updated',
				age: 31,
				certificate: false
			}
		}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		studentModel.findByIdAndUpdate.mockRejectedValue(new Error('Database error'))

		await studentController.updateStudent(request, response)

		expect(response.status).toHaveBeenCalledWith(500)
		expect(response.json).toHaveBeenCalledWith({ error: 'Database error' })
	})
})

describe('Delete Student', () => {
	it('should delete a student by ID', async () => {
		const request = {
			params: {
				idStudent: '670aa790c90a8fd4f8a406c4'
			}
		}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		studentModel.findByIdAndDelete.mockResolvedValue({
			message: `Student by id: ${request.params.idStudent} deleted successfully`
		})

		await studentController.deleteStudent(request, response)

		expect(response.status).toHaveBeenCalledWith(200)
		expect(response.json).toHaveBeenCalledWith({ message: `Student by id: ${request.params.idStudent} deleted successfully` })
	})

	it('should return an error if the student does not exist', async () => {
		const request = {
			params: {
				idStudent: '670aa790c90a8fd4f8a406c5',
			}
		}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		studentModel.findByIdAndDelete.mockResolvedValue(null)

		await studentController.deleteStudent(request, response)

		expect(response.status).toHaveBeenCalledWith(404)
		expect(response.json).toHaveBeenCalledWith({ message: 'Student not found' })
	})

	it('should return 500 error delete Student', async () => {
		const request = {
			params: {
				idStudent: '670aa790c90a8fd4f8a406c5'
			}
		}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		studentModel.findByIdAndDelete.mockRejectedValue(new Error('Database error'))

		await studentController.deleteStudent(request, response)

		expect(response.status).toHaveBeenCalledWith(500)
		expect(response.json).toHaveBeenCalledWith({ error: 'Database error' })
	})
})