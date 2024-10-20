const express = require("express")
const router = express.Router()
const studentsController = require('../controllers/studentController')

router.get("/", studentsController.getStudent)
router.post('/', studentsController.createStudents)
router.get("/:idStudent", studentsController.getStudentById)
router.put("/:idStudent", studentsController.updateStudent)
router.delete("/:idStudent", studentsController.deleteStudent)

module.exports = router