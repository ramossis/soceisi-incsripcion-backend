const express=require('express')
const router=express.Router()

const upload=require('../config/saveImage')
const EstudianteController = require('../controllers/estudiantes.controller')

const uploadInscripcion = upload.fields([
    {name:'foto_ci', maxCount:1},
    {name:'matricula', maxCount:1},
    {name:'registro_materia', maxCount:1},
])

router.get('/',EstudianteController.getAllEstudiante)
router.post('/',uploadInscripcion,EstudianteController.preInscripcionOnline)

module.exports=router