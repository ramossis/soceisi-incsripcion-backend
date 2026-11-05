const {z}=require('zod')

const createEventoSchema= z.object({
    nombre:z.string({
        required_error:"El nombre del evento es obligatorio"
    }).min(3,"EL nombre debe tener al menos 3 caracteres"),
    tipo:z.enum(["Curso","Taller","Charla","Asamblea"],{
        errorMap:()=>{{message:'El tipo debe ser Curso, Taller, Charla o Asamblea'}}
    }),
    fecha: z.coerce.date({
        invalid_type_error: "La fecha proporcionada no es valida"
    })
})

module.exports={createEventoSchema}