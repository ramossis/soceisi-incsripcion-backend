require('dotenv/config')
const express=require('express')
const app=express()

app.use('api/estudiante',require('./src/routes/estudiante.route'))

app.listen(process.env.port,()=>{

    console.log(`SERVER ON READY IN ${process.env.PORT}`)
})


