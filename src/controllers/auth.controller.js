const bcrypt = require('bcrypt')
const {prisma} = require('../config/db')
const {signToken}=require('../middlewares/auth')
const loginEncargado=async(req,res)=>{
    const {usuario,password}=req.body
    try {
        const encargado= await prisma.encargado.findUnique({
            where:{usuario}
        }) 
    if(!encargado)return res.status(404).json({error: `Usuario no encontrado`})
    const passwordValido= await bcrypt.compare(password,encargado.password)
    if (!passwordValido) return res.status(404).json({error:`Contrasenia Incorrecta`})
    const token=signToken(encargado.id,encargado.rol)
    res.status(202).json({
        mesage:`Bienvenido SOCEIISI`,
        token,
        usuario:{
            nombre:encargado.nombre_completo,
            rol:encargado.rol
        }
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({error :`Error en el servidor`})
    }
}
module.exports={loginEncargado}