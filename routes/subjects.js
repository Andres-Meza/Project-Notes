const express = require("express")
const router = express.Router()
const subjectsController = require('../controllers/subjectController')

router.get("/", subjectsController.getSubject)
router.post('/', subjectsController.createSubjects)
router.get("/:idSubject", subjectsController.getSubjectById)
router.put("/:idSubject", subjectsController.updateSubject)
router.delete("/:idSubject", subjectsController.deleteSubject)

module.exports = router