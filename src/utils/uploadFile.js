
const imagekit = require('../config/imagekit')
const path= require('path')
const uploadFile=async (file,ci)=>{
         if (!file) return null;

    const ext = path.extname(file.originalname).toLowerCase();
    const ciLimpio = ci.toString().trim();
    
  
    const nombreSeguro = `${file.fieldname}_${ciLimpio}_${Date.toLocaleString()}${ext}`
        .replace(/\s+/g, '_')   
        .replace(/[^\w.-]/g, ''); 
    const response = await imagekit.upload({
        file: file.buffer,
        fileName: nombreSeguro,
        folder: `SOCEIISI/2026/${ciLimpio}`,
        useUniqueFileName: false 
        });
    return response;
}
module.exports=uploadFile