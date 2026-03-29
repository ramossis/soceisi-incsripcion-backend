const bcrypt=require('bcrypt')
const {prisma} = require('../src/config/db')


async function main(){
    
    const hashedPassword = await bcrypt.hash('AdminSoceisi2026',10)
    
    console.log(`Iniciando el Seeding....`);
    
    const admin = await prisma.encargado.upsert({
        where: {usuario: 'ramos.ronaldo'},
        update:{},
        create:{
            nombre_completo:'Ronaldo Ramos',
            usuario:'ramos.ronaldo',
            password:hashedPassword,
            rol:'Presidente',
            estado_cuenta:true
        }
    })
    console.log(`Usuario Creado: ${admin.usuario}`);
}
main()
    .catch((e)=>{
        console.error(e);
        process.exit(1);
    })
    .finally(async()=>{
        await prisma.$disconnect();
    })