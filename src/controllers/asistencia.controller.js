const {prisma}= require('../config/db')

const asistenciaController={}

asistenciaController.registrarAsistencia=async(req,res)=>{
    try {
        const {eventoId,ci}=req.body

        if(!eventoId || !ci){
            return res.status(400).json({error:'El evento y el carnet de identidad son obligatorios'})
        }
        const miembro = await prisma.estudiante.findUnique({
            where:{ci}
        })
        if(!miembro)return res.status(400).json({error:'No se encontro un registro con ese Carnet'})
        
        const evento= await prisma.evento.findUnique({
            where:{id:eventoId}
        })
        if(!evento)return res.status(400).json({error:'El evento no existe o ya finalizo'})
        
        const asistenciaExistente= await prisma.asistencia.findFirst({
            where:{
                id_evento:eventoId,
                id_estudiante:miembro.id
            }
        })

        if(asistenciaExistente) return res.status(400).json({error:`Hola ${miembro.nombre} Ya registraste tu asistencia anteriormente`})
        
        const nuevaAsistencia= await prisma.asistencia.create({
            data:{
                id_estudiante:miembro.id,
                id_evento:eventoId
            }
        })
        return res.status(201).json({
            message:`Asistencia registrada con exito, ${miembro.nombres}`,
            data: nuevaAsistencia
        })
    } catch (error) {
        console.error('Error al registrar asistencia',error)
        return res.status(500).json({error:"Error interno al registrar la asistencia"})
    }
}
module.exports=asistenciaController