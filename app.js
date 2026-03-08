require('dotenv/config')
const express=require('express')
app=express()

app.listen(process.env.port,()=>{

    console.log(`SERVER ON READY IN ${process.env.PORT}`)
})
