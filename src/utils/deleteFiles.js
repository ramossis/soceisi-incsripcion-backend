const imagekit= require('../config/imagekit')

const deleteFromImagekit= async(fileIds)=>{
    if(!fileIds || fileIds.length === 0) return

    try {
        await imagekit.bulkDeleteFiles(fileIds)
        console.log(`[Roolback] Archivos eliminados de ImageKit: ${fileIds}`)
    } catch (error) {
        console.error(`[Error Critico] No se pudo limpiar ImageKit: ${error.message}`)
    }
}
module.exports=deleteFromImagekit