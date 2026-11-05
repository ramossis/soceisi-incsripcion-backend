const validate=(schema)=>(req,res,next)=>{

    const validacion= schema.safeParse(req.body)

    if (!validacion.success){
        const errores= validacion.error.issues|| validacion.error.errors || []
        return res.status(400).json({
            error:"Errores de validacion",
            detalles:errores.map(err => err.message)
        })
    }
    req.body= validacion.data
    next()
}
module.exports=validate