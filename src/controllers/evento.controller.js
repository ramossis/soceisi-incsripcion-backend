const {prisma}=require('../config/db')

const EventoController={}


EventoController.getAllEventos=async(req,res)=>{
    try {
        const eventos= await prisma.evento.findMany({
            orderBy:{
                id:'desc'
            }
        })
        return res.status(201).json({total: eventos.length, data:eventos})
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
        return res.status(500).json({error:"No se pudo crear el evento",detalle: error})
    }
}
EventoController.findEvento=async(req,res)=>{
    try {
        const {id}=req.body
        if (!id) return res.status(404).json({error:"Evento no encontrado"})
        
        const evento= await prisma.evento.findUnique({where:{ci}})

        return res.status(200).json({evento})
    } catch (error) {
        console.error(error)
           return res.status(500).json({error: `Evento no Encontrado`})
    }
}
EventoController.deleteEvento=async(req,res)=>{
    try {
        const {id}= req.params
        if(!id) return res.status(404).json({error:'Evento no encontrado'})
        await prisma.evento.delete({where:{id}})
        return res.status(200).json({message:'Evento Eliminado'})
    } catch (error) {
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
        return res.status(201).json({message:'Evento Actualizado',data:eventoActualizado})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error:'Error al actualizar el evento'})
    }
}
module.exports=EventoController