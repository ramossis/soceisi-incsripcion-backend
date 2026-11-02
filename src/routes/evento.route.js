const express=require('express')
const router= express.Router()

const {verifyToken}=require('../middlewares/auth')

const validate=require('../middlewares/validate.middleware')

const eventoController=require('../controllers/evento.controller')
const {createEventoSchema}=require('../validations/evento.validation')


router.get('/',verifyToken,eventoController.getAllEventos)
router.post('/',verifyToken,validate(createEventoSchema),eventoController.createEvento)
router.get('/',verifyToken,eventoController.findEvento)
router.put('/:id',verifyToken,validate(createEventoSchema),eventoController.updateEvento)
router.delete('/:id',verifyToken,eventoController.deleteEvento)


module.exports=router