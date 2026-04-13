const bcrypt=require('bcrypt')

const passwordPlano=`Fni71882923`
const saltRounds=10

bcrypt.hash(passwordPlano,saltRounds,(err,hash)=>{
    if(err) console.error(err)
    console.log(`La Password es ${hash}`)
})