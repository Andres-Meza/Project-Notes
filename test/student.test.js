const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const studentModel = require('../models/studentModel')
const jwt = require('jsonwebtoken')

const generateToken = () => {
	return jwt.sign({ userId: 'fakeUserId' }, 'secretKey', { expiresIn: '1h' })
}

async function cleanStudents() {
	try {
		await studentModel.deleteMany()

	} catch (error) {
		console.error('Error during Student Cleanup', error)
	}
}

async function closeConection() {
	try {
		await mongoose.connection.close()
	} catch (error) {
		console.error('Error closing MongoDB connection', error)
	}
}
afterEach(async () => {
	await cleanStudents()
})

afterAll(async () => {
	await closeConection()
	console.log('All tests completed Student')
})

describe('Student API With JWT', () => {

	it('I should create a new student', async () => {

		const token = generateToken()
		const response = await request(app)
			.post('/api/students')
			.set('Authorization', token)
			.send({
				name: 'John Doe',
				age: 20,
				certificate: true
			})

		expect(response.statusCode).toEqual(201)
		expect(response.body).toHaveProperty('_id')
		expect(response.body.name).toBe('John Doe')
	})

	it('Test to obtain the Students', async () => {

		await studentModel.create({
			name: 'John Doe',
			age: 20,
			certificate: true
		})

		const response = await request(app).get('/api/students')
		expect(response.statusCode).toEqual(200)
		expect(response.body.length).toBe(1)
	})

	it('Test to obtain the Students for ID', async () => {

		const student = await studentModel.create({
			name: 'Mario Lopez',
			age: 30,
			certificate: true
		})

		const token = generateToken()
		const response = await request(app)
			.get(`/api/students/${student._id}`)
			.set('Authorization', token)
		expect(response.statusCode).toEqual(200)
		expect(response.body.name).toBe('Mario Lopez')

	})

	it('Test to update the Student using the ID', async () => {
		const student = await studentModel.create({
			name: 'Andres Doe',
			age: 10,
			certificate: false
		})
		const token = generateToken()
		const response = await request(app)
			.put(`/api/students/${student._id}`)
			.set('Authorization', token)
			.send({
				name: 'Andres Lopez',
				age: 15,
				certificate: true
			})
		expect(response.statusCode).toEqual(200);
		expect(response.body.name).toBe('Andres Lopez');
		expect(response.body.age).toEqual(15);
		expect(response.body.certificate).toEqual(true);
	})

	it('Test to delete Student using ID', async () => {
		const student = await studentModel.create({
			name: 'Aurora Diaz',
      age: 25,
      certificate: false
		})
		const token = generateToken()
		const response = await request(app)
			.delete(`/api/students/${student._id}`)
			.set('Authorization', token)
			
    expect(response.statusCode).toEqual(200);
		expect(response.body.message).toBe(`Student by id: ${student._id} deleted successfully`);
	})
})