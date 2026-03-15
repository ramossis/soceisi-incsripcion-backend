
const { PrismaClient } = require('@prisma/client');
const uploadFile = require('../utils/uploadFile');

// Instancia limpia. Si el .env está bien, esto NO debería fallar.
const prisma = new PrismaClient();

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
EstudianteController.preInscripcionOnline=async(req,res)=>{
   try {
        const data=req.body
        const files=req.files
        const [urlCi,urlMatricula,urlMateria]= await Promise.all([
            uploadFile(files.foto_ci[0],data.ci),
            uploadFile(files.matricula[0],data.ci),
            uploadFile(files.registro_materia[0],data.ci)
        ]) 
        const resultado= await prisma.$transaction(async (tx)=>{
            const estudiante= await tx.estudiante.create({
                data:{
                    ...data
                }
            });
            await tx.documento.create({
                data:{
                    id_estudiante:estudiante.id,
                    foto_ci:urlCi,
                    matricula:urlMatricula,
                    registro_materia:urlMateria
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
        console.error("Error en el servidor",error)
        res.status(500).json({errror: "No se pudo procesar la solicitud"})
    
   }
}
module.exports = EstudianteController;