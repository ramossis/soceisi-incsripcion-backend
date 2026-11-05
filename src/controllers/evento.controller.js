const {prisma}=require('../config/db')

const EventoController={}


EventoController.getAllEventos=async(req,res)=>{
    try {
        const eventos= await prisma.evento.findMany({
            orderBy:{
                id:'desc'
            }
        })
        return res.status(200).json({total: eventos.length, data:eventos})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error:'Error al obtener los eventos'})
    }
}


EventoController.createEvento=async(req,res)=>{
    try {
        const {nombre,tipo,fecha}=req.body
        const nuevoEvento=await prisma.evento.create(
        {
            data:{
                nombre,
                tipo,
                fecha:new Date(fecha)
            }
        })
        return res.status(201).json({message: "Evento creado Exitosamente",evento:nuevoEvento})
        
    } catch (error) {
        console.error('Error al crear el evento',error)
        return res.status(500).json({error:"No se pudo crear el evento"})
    }
}
EventoController.findEvento=async(req,res)=>{
    try {
        const id = Number(req.params.id)
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({error:"El ID del evento no es valido"})
        }

        const evento= await prisma.evento.findUnique({where:{id}})
        if (!evento) return res.status(404).json({error:"Evento no encontrado"})

        return res.status(200).json({evento})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: `Evento no Encontrado`})
    }
}
EventoController.deleteEvento=async(req,res)=>{
    try {
        const id = Number(req.params.id)
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({error:'El ID del evento no es valido'})
        }

        // relationMode="prisma" no crea FKs: hay que borrar las asistencias
        // asociadas antes de eliminar el evento.
        await prisma.$transaction([
            prisma.asistencia.deleteMany({where:{id_evento:id}}),
            prisma.evento.delete({where:{id}})
        ])
        return res.status(200).json({message:'Evento Eliminado'})
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({error:'Evento no encontrado'})
        }
        console.error(error)
        return res.status(500).json({error:'Error al eliminar el Evento'})
    }
}
EventoController.updateEvento=async(req,res)=>{
    try {
        const {id}=req.params
        const updateData=req.body

        const eventoActualizado = await prisma.evento.update({
            where:{id:Number(id)},
            data:updateData
        })
        return res.status(200).json({message:'Evento Actualizado',data:eventoActualizado})
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({error:'Evento no encontrado'})
        }
        console.error(error)
        return res.status(500).json({error:'Error al actualizar el evento'})
    }
}
module.exports=EventoController