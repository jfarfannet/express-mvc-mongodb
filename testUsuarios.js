require('dotenv').config();
const mongoose = require('mongoose');
const Usuario = require('./models/Usuario');

async function testUsuarios() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Limpiar la colección
    await Usuario.deleteMany({});
    console.log('🗑️ Colección de usuarios limpiada');

    // Crear usuarios de prueba
    const usuariosTest = [
      { 
        username: 'admin', 
        password: 'admin123', 
        correo: 'admin@ejemplo.com' 
      },
      { 
        username: 'juan_perez', 
        password: 'juan2024', 
        correo: 'juan@ejemplo.com' 
      },
      { 
        username: 'maria_lopez', 
        password: 'maria456', 
        correo: 'maria@ejemplo.com' 
      }
    ];

    const usuarios = await Usuario.insertMany(usuariosTest);
    console.log('✅ Usuarios creados:', usuarios.length);
    
    usuarios.forEach(u => {
      console.log(`- ${u.username} (${u.correo})`);
    });

    const todos = await Usuario.find();
    console.log('\n👥 Total en BD:', todos.length);

    await mongoose.connection.close();
    console.log('\n✅ Prueba completada exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testUsuarios();