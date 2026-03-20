require('dotenv/config')
const jwt = require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token) return res.status(401).json({error: `Acceso Denegado... Inicia Sesion`})
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user={
            id:decoded.id,
            rol:decoded.rol
        }
        next()
    } catch (error) {
        res.status(403).json({error: `Token invalido o expirado`})
    }
}

const signToken=(id,rol)=>{
    const token= jwt.sign({
        id,rol
    },
    process.env.JWT_SECRET,
    {expiresIn:'1h'}
)
    return token
}
module.exports={verifyToken,signToken}