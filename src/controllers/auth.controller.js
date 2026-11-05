const bcrypt = require('bcrypt')
const {prisma} = require('../config/db')
const {signToken}=require('../middlewares/auth')

// Hash de referencia para comparar incluso cuando el usuario no existe.
// Evita diferencias de tiempo que permitan enumerar usuarios.
const DUMMY_HASH = '$2b$10$KfJgNqLi7MX33N60fzq0GeItcWqF3SulPJInSIdpzG7krVBwLKhJm'

const loginEncargado=async(req,res)=>{
    const {usuario,password}=req.body
    try {
        const encargado= await prisma.encargado.findUnique({
            where:{usuario}
        })

        const passwordValido = await bcrypt.compare(
            typeof password === 'string' ? password : '',
            encargado?.password || DUMMY_HASH
        )

        if (!encargado || !passwordValido || !encargado.estado_cuenta) {
            return res.status(401).json({error: 'Credenciales invalidas'})
        }

        const token=signToken(encargado.id,encargado.rol)
        return res.status(200).json({
            message:`Bienvenido SOCEIISI`,
            token,
            usuario:{
                nombre:encargado.nombre_completo,
                rol:encargado.rol
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error :`Error en el servidor`})
    }
}
module.exports={loginEncargado}
