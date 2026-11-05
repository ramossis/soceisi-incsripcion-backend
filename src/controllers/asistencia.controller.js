const { prisma } = require('../config/db')

const asistenciaController = {}

asistenciaController.registrarAsistencia = async (req, res) => {
    try {
        const { eventoId, ci } = req.body

        if (!eventoId || !ci) {
            return res.status(400).json({ error: 'El evento y el carnet de identidad son obligatorios' })
        }

        const miembro = await prisma.estudiante.findUnique({
            where: { ci }
        })
        if (!miembro) {
            return res.status(404).json({ error: 'No se encontro un registro con ese Carnet' })
        }

        const evento = await prisma.evento.findUnique({
            where: { id: eventoId }
        })
        if (!evento) {
            return res.status(404).json({ error: 'El evento no existe o ya finalizo' })
        }

        const asistenciaExistente = await prisma.asistencia.findFirst({
            where: {
                id_evento: eventoId,
                id_estudiante: miembro.id
            }
        })

        if (asistenciaExistente) {
            return res.status(409).json({
                error: `Hola ${miembro.nombres}, ya registraste tu asistencia anteriormente`
            })
        }

        const nuevaAsistencia = await prisma.asistencia.create({
            data: {
                id_estudiante: miembro.id,
                id_evento: eventoId
            }
        })

        return res.status(201).json({
            message: `Asistencia registrada con exito, ${miembro.nombres}`,
            data: nuevaAsistencia
        })
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Ya registraste tu asistencia a este evento' })
        }
        console.error('Error al registrar asistencia', error)
        return res.status(500).json({ error: 'Error interno al registrar la asistencia' })
    }
}

module.exports = asistenciaController
