const bcrypt = require('bcrypt')
const { prisma } = require('../src/config/db')

async function main() {
    console.log(`Iniciando el Seeding....`);

    // Definimos los usuarios en un arreglo
    const usuarios = [
        {
            usuario: 'ramos.ronaldo',
            nombre: 'Ronaldo Ramos',
            password: 'AdminSoceisi2026',
            rol: 'Presidente',
            estado_cuenta: true
        },
        {
            usuario: 'santos.paola',
            nombre: 'Paola Santos',
            password: 'Socio2026_paola',
            rol: 'Admin',
            estado_cuenta:true
        },
        {
            usuario: 'araya.danna',
            nombre: 'Danna Araya',
            password: 'Socio2026_danna',
            rol: 'Admin',
            estado_cuenta:true
        },
        {
            usuario: 'garcia.jose',
            nombre:'Jose Garcia',
            password:'Socio2026_jose',
            rol:"Vicepresidente",
            estado_cuenta:true
        },
        {
            usuario: 'tintares.derlis',
            nombre:'Derlis Tintares',
            password:'Socio2026_derlis',
            rol:"Admin",
            estado_cuenta:true    
        }

    ];

    // Recorremos el arreglo para crear/actualizar cada uno
    for (const u of usuarios) {
        const hashedPassword = await bcrypt.hash(u.password, 10);

        const admin = await prisma.encargado.upsert({
            where: { usuario: u.usuario },
            update: {}, // Si ya existe, no cambia nada
            create: {
                nombre_completo: u.nombre,
                usuario: u.usuario,
                password: hashedPassword,
                rol: u.rol,
                estado_cuenta: true
            }
        });

        console.log(`Usuario gestionado: ${admin.usuario} (${admin.rol})`);
    }

    console.log(`Seeding completado con éxito.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });