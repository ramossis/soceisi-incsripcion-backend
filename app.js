require('dotenv').config()
const express=require('express')
const app=express()
const cors=require('cors')
const morgan=require("morgan")

app.use(cors())
app.use(morgan(process.env.LOG_FORMAT || 'dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>res.send('API SOCEIISI 2026 - Operativa'))
app.use('/api/estudiante',require('./src/routes/estudiante.route'))
app.use('/api/evento',require('./src/routes/evento.route'))
app.use(`/api/login`,require('./src/routes/auth.route'))

const PORT=process.env.PORT || 3000

app.listen(PORT,'0.0.0.0',()=>{

    console.log(`SERVER ON READY IN ${PORT}`)
})


