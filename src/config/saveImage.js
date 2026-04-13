const multer=require('multer')

const storage= multer.memoryStorage()

const uploadRam= multer({
    storage,
    limits:{fileSize: 5* 1024 *1024},
    fileFilter: (req,file,cb)=>{
        const allowedTypes=['image/jpeg','image/png', 'appliaction/pdf']
        if (allowedTypes.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(new Error ('Formato no soportado',false))
        }
    }
})

module.exports=uploadRam