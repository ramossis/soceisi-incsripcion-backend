const express=require('express')
const router=express.Router()

const EstudianteController = require('../controllers/estudiantes.controller')


router.get('/',EstudianteController.getAllEstudiante)

module.exports=router