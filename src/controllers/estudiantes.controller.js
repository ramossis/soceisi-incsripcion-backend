
const deleteFromImageKit =require('../utils/deleteFiles')
const uploadFile = require('../utils/uploadFile');
const {prisma}=require('../config/db')
const EstudianteController = {};

EstudianteController.getAllEstudiante = async (req, res) => {
    try {
        const estudiantes = await prisma.estudiante.findMany();
        return res.status(200).json(estudiantes);
    } catch (error) {
        console.error("DETALLE DEL ERROR:", error);
        return res.status(500).json({ 
            message: "Error en el servidor", 
            code: error.code 
        });
    }
};
EstudianteController.findEstudiantePreInscrio=async(req,res)=>{
    const {ci}=req.params
    if(!ci)return req.status(404).json({error:'Estudiante no Encontrado'})
    try {
        const estudiante=await prisma.estudiante.findUnique({
            where:{ci},
            include:{
                documentos:true,
                membresias:true
            }
        })
        return res.status(200).json(estudiante)
    } catch (error) {
        return res.status(500).json({error: `Estudiante no Encontrado`})
    }
}

EstudianteController.preInscripcionOnline=async(req,res)=>{
    let filesIds=[]
   try {
        const data=req.body
        const files=req.files
        const [resCi,resMat,resReg]= await Promise.all([
            uploadFile(files.foto_ci[0],data.ci),
            uploadFile(files.matricula[0],data.ci),
            uploadFile(files.registro_materia[0],data.ci)
        ])
        filesIds=[resCi.fileId,resMat.fileId,resReg.fileId]
        const resultado= await prisma.$transaction(async (tx)=>{
            const estudiante= await tx.estudiante.create({
                data:{
                    ...data
                }
            });
            await tx.documento.create({
                data:{
                    id_estudiante:estudiante.id,
                    foto_ci:resCi.url,
                    matricula:resMat.url,
                    registro_materia:resReg.url
                }
            })
            await tx.membresia.create({
                data:{
                    id_estudiante:estudiante.id,
                    gestion:"2026",
                    pagado:false,
                    monto:0.00
                }
            });
            return estudiante
        })
        res.status(201).json({
            message: "Pre Inscripcion enviada Correctamente",
            estudiante_id:resultado.id
        })

   } catch (error) {
        if(filesIds.length >0){
            await deleteFromImageKit(filesIds)
        }
        if(error.code=== 'P2002'){
            return res.status(400).json({error: "El Estudiante ya esta registrado.."})
        }
        res.status(500).json({errror: "No se pudo procesar la solicitud"})
    
   }
}
EstudianteController.confirmarPago=async(req,res)=>{
    const {id_estudiante,monto}=req.body
    const id_encargado=req.user.id
    try {
        const resultado= await prisma.$transaction(async(tx)=>{
            const membresia = await tx.membresia.updateMany({
                where:{
                    id_estudiante:parseInt(id_estudiante),
                    gestion:`2026`
                },
                data:{
                    pagado:true,
                    monto,
                    id_encargado
                }
            })
            await tx.documento.updateMany({
                where:{
                    id_estudiante:parseInt(id_estudiante)},
                    data:{
                        recibido_fisico:true,
                        verfiicado:true
                    }
            })
            const estudiante= await tx.estudiante.update({
                where:{id:parseInt(id_estudiante)},
                data:{estado_inscripcion:"Activo"}
            })
            return estudiante
        })
        res.status(200).json({
            message:"Inscripcion completada y Estudiante activado",
            estudiante: `${resultado.nombres} - ${resultado.apellidos} `
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({error:`Error al procesar pago fisico`})
    }
}
module.exports = EstudianteController;