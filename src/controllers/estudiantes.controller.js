const { PrismaClient } = require('@prisma/client');

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
EstudianteController.inscribitEstudiante=(req,res)=>{
    const data=req.body
    console.log({data})
}
module.exports = EstudianteController;