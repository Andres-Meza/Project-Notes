const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const subjectModel = require('../models/subjectModel')
const jwt = require('jsonwebtoken')

const generateToken = () => {
	return jwt.sign({ userId: 'fakeUserId' }, 'secretKey', { expiresIn: '1h' })
}

async function cleanSubjects() {
	try {
		await subjectModel.deleteMany()

	} catch (error) {
		console.error('Error during Subjects Cleanup', error)
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
	await cleanSubjects()
})

afterAll(async () => {
	await closeConection()
	console.log('All tests completed Subjects')
})

describe('Subjects API Whit JWT', () => {

	it('I should create a new subject', async () => {
		const token = generateToken()
		const response = await request(app)
			.post('/api/subjects')
			.set('Authorization', token)
			.send({
				name: "Math",
				grade: 11,
				students: ["670aa755c90a9fd3f8a406c1"],
				teacher: "Tere Burgos"
			})

		expect(response.status).toBe(201)
		expect(response.body.name).toBe('Math')
	})

	it('Test to obtain the Subjects', async () => {

		await subjectModel.create({
			name: "Biology",
			grade: 10,
			students: ["670aa755c90a9fd3f8a406c1"],
			teacher: "Tere Burgos"
		})

		const token = generateToken()
		const response = await request(app)
			.get('/api/subjects')
			.set('Authorization', token)
		expect(response.statusCode).toEqual(200)
		expect(response.body.length).toBe(1)
	})

	it('Test to obtain the Students for ID', async () => {

		const subject = await subjectModel.create({
			name: "English",
			grade: 9,
			students: ["670aa755c90a8fd4f8a406c1"],
			teacher: "Luis Diaz"
		})

		const token = generateToken()
		const response = await request(app)
			.get(`/api/subjects/${subject._id}`)
			.set('Authorization', token)
		expect(response.statusCode).toEqual(200)
		expect(response.body.teacher).toBe('Luis Diaz')

	})

	it('Test to update the Subject using the ID', async () => {
		const subject = await subjectModel.create({
			name: "Math",
			grade: 8,
			students: ["670aa755c90a8fd4f8a406c1"],
			teacher: "Aurora Diaz"
		})
		const token = generateToken()
		const response = await request(app)
			.put(`/api/subjects/${subject._id}`)
			.set('Authorization', token)
			.send({
				name: "Chemistry",
				grade: 9,
				students: ["670aa790c90a8fd4f8a406c4" , "103aa790c90a8fd4f8a406c4"],
				teacher: "Dagoberto Meza"
			})
		expect(response.statusCode).toEqual(200);
		expect(response.body.name).toBe('Chemistry');
		expect(response.body.grade).toBe(9);
		expect(response.body.students.length).toBe(2);
		expect(response.body.teacher).toBe('Dagoberto Meza');
	})

	it('Test to delete Subject using ID', async () => {
		const subject = await subjectModel.create({
			name: "English",
			grade: 9,
			students: ["670aa755c90a8fd4f8a406c1"],
			teacher: "Luis Diaz"
		})
		const token = generateToken()
		const response = await request(app)
			.delete(`/api/subjects/${subject._id}`)
			.set('Authorization', token)
			
		expect(response.statusCode).toEqual(200);
		expect(response.body.message).toBe(`Subject by id: ${subject._id} deleted successfully`);
	})
})