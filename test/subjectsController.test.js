const subjectModel = require('../models/subjectModel');
const subjectController = require('../controllers/subjectController');

jest.mock('../models/subjectModel');

beforeEach(() => {
	jest.clearAllMocks();
});

describe('getSubject', () => {
	it('should return a subject object', async () => {
		const request = {};
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		};

		subjectModel.find = jest.fn().mockReturnValue({
			populate: jest.fn().mockResolvedValue([{
				name: "Biology",
				grade: 10,
				students: ["670aa755c90a9fd3f8a406c1"],
				teacher: "Tere Burgos"
			}])
		});

		await subjectController.getSubject(request, response);

		expect(response.status).toHaveBeenCalledWith(200);
		expect(response.json).toHaveBeenCalledWith([{
			name: "Biology",
			grade: 10,
			students: ["670aa755c90a9fd3f8a406c1"],
			teacher: "Tere Burgos"
		}]);
	});

	it('should return an error if there is a problem with the database', async () => {
		const request = {};
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		};

		subjectModel.find = jest.fn().mockReturnValue({
			populate: jest.fn().mockRejectedValue(new Error('Database error'))
		});

		await subjectController.getSubject(request, response);

		expect(response.status).toHaveBeenCalledWith(500);
		expect(response.json).toHaveBeenCalledWith({ error: 'Database error' });
	});
});

describe('Create Subjects', () => {
	it('should create a new subject', async () => {
		const request = {
			body: {
				name: "Biology",
				grade: 10,
				students: ["670aa755c90a9fd3f8a406c1"],
				teacher: "Tere Burgos"
			}
		}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		subjectModel.prototype.save = jest.fn().mockResolvedValue({
			name: "Biology",
			grade: 10,
			students: ["670aa755c90a9fd3f8a406c1"],
			teacher: "Tere Burgos",
			_id: "670aa790c90a8fd4f8a406c4",
			__v: 0
		})

		await subjectController.createSubjects(request, response)

		expect(response.status).toHaveBeenCalledWith(201)
		// expect(response.json).toHaveBeenCalledWith({
		// name: "Biology",
		// grade: 10,
		// students: ["670aa755c90a9fd3f8a406c1"],
		// teacher: "Tere Burgos"
		// 	_id: '670aa790c90a8fd4f8a406c4',
		// 	__v: 0,
		// });
	})
})

describe('Get Subjects For ID', () => {
	it('should return a subject by ID', async () => {
		const request = {
			params: {
				idSubject: '670aa790c90a8fd4f8a406c4'
			}
		};
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		};

		const mockSubject = {
			name: "Biology",
			grade: 10,
			students: ["670aa755c90a9fd3f8a406c1"],
			teacher: "Tere Burgos",
			_id: '670aa790c90a8fd4f8a406c4',
			__v: 0,
		};

		subjectModel.findById = jest.fn().mockReturnValue({
			populate: jest.fn().mockResolvedValue(mockSubject)
		});

		await subjectController.getSubjectById(request, response);

		expect(response.status).toHaveBeenCalledWith(200);
		expect(response.json).toHaveBeenCalledWith(mockSubject);
	});

	it('should return an error if the subject does not exist', async () => {
		const request = {
			params: {
				idSubject: '670aa790c90a8fd4f8a406c5'
			}
		};
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		};

		subjectModel.findById = jest.fn().mockReturnValue({
			populate: jest.fn().mockResolvedValue(null)
		});

		await subjectController.getSubjectById(request, response);

		expect(response.status).toHaveBeenCalledWith(404);
		expect(response.json).toHaveBeenCalledWith({ message: 'Subject not found' });
	});

	it('Should return 500 error get Subjects', async () => {
		const request = {
			params: {
				idSubject: '670aa790c90a8fd4f8a406c5'
			}
		};
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		};

		subjectModel.findById = jest.fn().mockReturnValue({
			populate: jest.fn().mockRejectedValue(new Error('Database error'))
		});

		await subjectController.getSubjectById(request, response);

		expect(response.status).toHaveBeenCalledWith(500);
		expect(response.json).toHaveBeenCalledWith({ error: 'Database error' });
	});
});

describe('Update Subject', () => {
	it('should update a subject by ID', async () => {
		const request = {
			params: {
				idSubject: '670aa790c90a8fd4f8a406c4'
			},
			body: {
				name: "Biology",
				grade: 10,
				students: ["670aa755c90a9fd3f8a406c1"],
				teacher: "Tere Burgos"
			}
		}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		subjectModel.findByIdAndUpdate.mockResolvedValue({
			name: "Math",
			grade: 10,
			students: ["670aa766c90a9fd3f8a406c1"],
			teacher: "Aurora Burgos",
			_id: '670aa790c90a8fd4f8a406c4',
			__v: 0,
		})

		await subjectController.updateSubject(request, response)

		expect(response.status).toHaveBeenCalledWith(200)
		expect(response.json).toHaveBeenCalledWith({
			name: "Math",
			grade: 10,
			students: ["670aa766c90a9fd3f8a406c1"],
			teacher: "Aurora Burgos",
			_id: '670aa790c90a8fd4f8a406c4',
			__v: 0,
		})
	})

	it('should return an error if the subject does not exist', async () => {
		const request = {
			params: {
				idSubject: '670aa790c90a8fd4f8a406c5'
			},
			body: {
				name: "Math",
				grade: 10,
				students: ["670aa766c90a9fd3f8a406c1"],
				teacher: "Aurora Burgos",
			}
		}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		subjectModel.findByIdAndUpdate.mockResolvedValue(null)

		await subjectController.updateSubject(request, response)

		expect(response.status).toHaveBeenCalledWith(404)
		expect(response.json).toHaveBeenCalledWith({ message: 'Subject not found' })
	})

	it('should return 500 error update Subject', async () => {
		const request = {
			params: {
				idSubject: '670aa790c90a8fd4f8a406c5'
			},
			body: {
				name: "Math",
				grade: 10,
				students: ["670aa766c90a9fd3f8a406c1"],
				teacher: "Aurora Burgos",
			}
		}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		subjectModel.findByIdAndUpdate.mockRejectedValue(new Error('Database error'))

		await subjectController.updateSubject(request, response)

		expect(response.status).toHaveBeenCalledWith(500)
		expect(response.json).toHaveBeenCalledWith({ error: 'Database error' })
	})
})

describe('Delete Subject', () => {
	it('should delete a subject by ID', async () => {
		const request = {
			params: {
				idSubject: '670aa790c90a8fd4f8a406c4'
			}
		}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		subjectModel.findByIdAndDelete.mockResolvedValue({
			message: `Subjectt by id: ${request.params.idSubject} deleted successfully`
		})

		await subjectController.deleteSubject(request, response)

		expect(response.status).toHaveBeenCalledWith(200)
		expect(response.json).toHaveBeenCalledWith({ message: `Subject by id: ${request.params.idSubject} deleted successfully` })
	})

	it('should return an error if the subject does not exist', async () => {
		const request = {
			params: {
				idSubject: '670aa790c90a8fd4f8a406c5',
			}
		}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		subjectModel.findByIdAndDelete.mockResolvedValue(null)

		await subjectController.deleteSubject(request, response)

		expect(response.status).toHaveBeenCalledWith(404)
		expect(response.json).toHaveBeenCalledWith({ message: 'Subject not found' })
	})

	it('should return 500 error delete Subject', async () => {
		const request = {
			params: {
				idSubject: '670aa790c90a8fd4f8a406c5'
			}
		}
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		subjectModel.findByIdAndDelete.mockRejectedValue(new Error('Database error'))

		await subjectController.deleteSubject(request, response)

		expect(response.status).toHaveBeenCalledWith(500)
		expect(response.json).toHaveBeenCalledWith({ error: 'Database error' })
	})
})