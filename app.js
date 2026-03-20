require('dotenv/config')
const express=require('express')
const app=express()


app.use(express.json())
app.use('/api/estudiante',require('./src/routes/estudiante.route'))
app.use(`/api/login`,require('./src/routes/auth.route'))
app.listen(process.env.PORT,()=>{

    console.log(`SERVER ON READY IN ${process.env.PORT}`)
})


