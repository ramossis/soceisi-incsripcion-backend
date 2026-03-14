const express=require('express')
const router=express.Router()

const EstudianteController = require('../controllers/estudiantes.controller')


router.get('/',EstudianteController.getAllEstudiante)
router.post('/',EstudianteController.inscribitEstudiante)

module.exports=router