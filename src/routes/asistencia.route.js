const express=require('express')

const router=express.Router()

const asistenciaController= require('../controllers/asistencia.controller')

const validate=require('../middlewares/validate.middleware')

const {createAsistenciaSchema}=require('../validations/asistencia.validation')

router.post('/',validate(createAsistenciaSchema),asistenciaController.registrarAsistencia)

module.exports=router