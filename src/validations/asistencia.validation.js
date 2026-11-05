const {z}=require('zod')

const createAsistenciaSchema= z.object({
    eventoId: z.coerce.number(),
    ci: z.string().min(4,'El ci es demasiado corto')
})

module.exports={createAsistenciaSchema}