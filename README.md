# 📦 Sistema MVC con MongoDB y Handlebars

Sistema de gestión de Productos y Usuarios construido con Node.js, Express, MongoDB y Handlebars siguiendo el patrón MVC (Model-View-Controller).

## 🚀 Características

- ✅ **CRUD completo de Productos** (id, nombre, precio, cantidad)
- ✅ **CRUD completo de Usuarios** (id, username, password, correo)
- ✅ Patrón MVC con Repository y Service
- ✅ Vistas con Handlebars (HBS)
- ✅ Base de datos MongoDB
- ✅ Validaciones en modelos y servicios
- ✅ Interfaz moderna y responsive
- ✅ Menú de navegación entre módulos

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [MongoDB](https://www.mongodb.com/try/download/community) (versión 4.4 o superior)
- npm (viene con Node.js)

## 📥 Instalación

### 1. Clonar o descargar el proyecto

```bash
git clone <url-del-repositorio>
cd express-mvc-mongodb
```

O si no usas git, simplemente descarga y extrae el proyecto.

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará:
- `express` - Framework web
- `mongoose` - ODM para MongoDB
- `express-handlebars` - Motor de plantillas
- `method-override` - Para peticiones PUT y DELETE
- `dotenv` - Variables de entorno
- `nodemon` - Auto-reinicio del servidor (dev)

## 🗄️ Configuración de la Base de Datos

### Opción A: MongoDB Local

#### Windows

1. **Descargar MongoDB**
   - Ve a: https://www.mongodb.com/try/download/community
   - Descarga la versión para Windows
   - Ejecuta el instalador

2. **Iniciar MongoDB como Servicio**
   ```bash
   # MongoDB se instala como servicio automáticamente
   # Verifica que esté corriendo:
   net start MongoDB
   ```

3. **Verificar instalación**
   ```bash
   mongosh
   # Deberías ver: Current Mongosh Log ID: ...
   exit
   ```

#### macOS

1. **Instalar con Homebrew**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```

2. **Iniciar MongoDB**
   ```bash
   brew services start mongodb-community
   ```

3. **Verificar instalación**
   ```bash
   mongosh
   exit
   ```

#### Linux (Ubuntu/Debian)

1. **Instalar MongoDB**
   ```bash
   # Importar clave pública
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   
   # Crear archivo de lista
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   
   # Actualizar e instalar
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   ```

2. **Iniciar MongoDB**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

3. **Verificar instalación**
   ```bash
   mongosh
   exit
   ```

### Opción B: MongoDB Atlas (Cloud - Gratis)

1. **Crear cuenta**
   - Ve a: https://www.mongodb.com/cloud/atlas/register
   - Crea una cuenta gratuita

2. **Crear un Cluster**
   - Click en "Build a Database"
   - Selecciona el plan FREE (M0)
   - Elige una región cercana
   - Click en "Create"

3. **Configurar acceso**
   - Crea un usuario de base de datos (guarda usuario y contraseña)
   - Whitelist IP: Click en "Add My Current IP Address"
   - O permite acceso desde cualquier IP: `0.0.0.0/0`

4. **Obtener cadena de conexión**
   - Click en "Connect"
   - Selecciona "Connect your application"
   - Copia la cadena de conexión
   - Ejemplo: `mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/productosdb`

## ⚙️ Configuración del Proyecto

### 1. Crear archivo de variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
# Para MongoDB Local
PORT=3000
MONGODB_URI=mongodb://localhost:27017/productosdb

# O para MongoDB Atlas
# PORT=3000
# MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/productosdb
```

**Importante**: Reemplaza `usuario` y `password` con tus credenciales si usas Atlas.

### 2. Verificar estructura de carpetas

Asegúrate de tener esta estructura:

```
productos-mvc-app/
├── controllers/
│   ├── productoController.js
│   └── usuarioController.js
├── models/
│   ├── Producto.js
│   └── Usuario.js
├── repositories/
│   ├── productoRepository.js
│   └── usuarioRepository.js
├── services/
│   ├── productoService.js
│   └── usuarioService.js
├── views/
│   ├── layouts/
│   │   └── main.hbs
│   ├── productos/
│   │   ├── index.hbs
│   │   ├── crear.hbs
│   │   └── editar.hbs
│   └── usuarios/
│       ├── index.hbs
│       ├── crear.hbs
│       └── editar.hbs
├── public/
│   └── css/
│       └── styles.css
├── .env
├── app.js
├── package.json
└── README.md
```

## 🎮 Ejecutar la Aplicación

### Modo Desarrollo (con auto-reload)

```bash
npm run dev
```

### Modo Producción

```bash
npm start
```

Deberías ver en la consola:

```
🚀 Servidor ejecutándose en http://localhost:3000
✅ Conectado a MongoDB
```

### Abrir en el navegador

```
http://localhost:3000
```

## 🧪 Probar con Datos de Ejemplo

### Script para Productos

```bash
node test-db.js
```

Esto creará:
- Laptop HP ($800 x 5)
- Mouse Logitech ($25.50 x 20)
- Teclado Mecánico ($120 x 10)

### Script para Usuarios

```bash
node test-usuarios.js
```

Esto creará:
- admin (admin@ejemplo.com)
- juan_perez (juan@ejemplo.com)
- maria_lopez (maria@ejemplo.com)

## 📖 Uso de la Aplicación

### Módulo de Productos

1. **Ver todos los productos**
   - Click en "📦 Productos" en el menú
   - Verás una tabla con todos los productos

2. **Crear producto**
   - Click en "➕ Nuevo Producto"
   - Completa: Nombre, Precio, Cantidad
   - Click en "💾 Guardar"

3. **Editar producto**
   - Click en "✏️ Editar" en la fila del producto
   - Modifica los campos
   - Click en "💾 Actualizar"

4. **Eliminar producto**
   - Click en "🗑️ Eliminar" en la fila del producto
   - Confirma la eliminación

### Módulo de Usuarios

1. **Ver todos los usuarios**
   - Click en "👥 Usuarios" en el menú
   - Verás una tabla con todos los usuarios

2. **Crear usuario**
   - Click en "➕ Nuevo Usuario"
   - Completa: Username, Correo, Password
   - Click en "💾 Guardar"

3. **Editar usuario**
   - Click en "✏️ Editar" en la fila del usuario
   - Modifica los campos
   - Click en "💾 Actualizar"

4. **Eliminar usuario**
   - Click en "🗑️ Eliminar" en la fila del usuario
   - Confirma la eliminación

## 🏗️ Arquitectura del Proyecto

### Patrón MVC Extendido

```
┌─────────────┐
│    Vista    │ (Handlebars .hbs)
│  (View)     │
└──────┬──────┘
       │
┌──────▼──────────┐
│  Controlador    │ (Controllers)
│  (Controller)   │ - Maneja HTTP
└──────┬──────────┘
       │
┌──────▼──────────┐
│   Servicio      │ (Services)
│   (Service)     │ - Lógica de negocio
└──────┬──────────┘
       │
┌──────▼──────────┐
│  Repositorio    │ (Repositories)
│  (Repository)   │ - Acceso a datos
└──────┬──────────┘
       │
┌──────▼──────────┐
│    Modelo       │ (Models)
│    (Model)      │ - Esquema MongoDB
└─────────────────┘
```

### Flujo de una petición

1. **Usuario** hace clic en "Editar producto"
2. **Router** (`app.js`) recibe: `GET /productos/:id/editar`
3. **Controller** (`productoController.js`) procesa la petición
4. **Service** (`productoService.js`) aplica lógica de negocio
5. **Repository** (`productoRepository.js`) consulta MongoDB
6. **Model** (`Producto.js`) define estructura de datos
7. **Controller** renderiza la vista con los datos
8. **Vista** (`editar.hbs`) muestra el formulario al usuario

## 🛠️ Solución de Problemas

### Error: "Cannot connect to MongoDB"

**Problema**: MongoDB no está corriendo

**Solución**:
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Error: "Port 3000 already in use"

**Problema**: El puerto está ocupado

**Solución**: Cambia el puerto en `.env`
```
PORT=3001
```

### Error: "Cannot find module"

**Problema**: Falta un archivo o dependencia

**Solución**:
```bash
# Verificar archivos
node check-files.js

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Cannot GET /usuarios"

**Problema**: Las rutas no se registraron

**Solución**:
1. Verifica que existan todos los archivos de usuarios
2. Reinicia el servidor completamente (Ctrl+C y `npm run dev`)
3. Verifica que `app.js` tenga las rutas de usuarios

### Datos no se muestran en las tablas

**Problema**: Los objetos Mongoose no se leen en Handlebars

**Solución**: Ya está implementado con `allowProtoPropertiesByDefault: true`

## 📦 Dependencias

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "express-handlebars": "^7.1.2",
    "method-override": "^3.0.0",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

## 🔒 Notas de Seguridad

⚠️ **IMPORTANTE**: Este proyecto es para fines educativos. Para producción:

1. **Encriptar contraseñas**
   ```bash
   npm install bcrypt
   ```

2. **Implementar autenticación**
   ```bash
   npm install express-session passport
   ```

3. **Validar inputs del lado del servidor**
   ```bash
   npm install express-validator
   ```

4. **Usar variables de entorno seguras**
   - No subir `.env` a repositorios públicos
   - Usar servicios como AWS Secrets Manager

## 📝 Scripts Disponibles

```bash
# Iniciar en modo desarrollo (con nodemon)
npm run dev

# Iniciar en modo producción
npm start

# Verificar archivos necesarios
node check-files.js

# Crear productos de prueba
node test-db.js

# Crear usuarios de prueba
node test-usuarios.js
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -m 'Agregar mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Autor

Desarrollado como proyecto educativo para aprender:
- Patrón MVC
- Node.js y Express
- MongoDB y Mongoose
- Handlebars
- Arquitectura en capas

## 📞 Soporte

Si tienes problemas:
1. Revisa la sección "Solución de Problemas"
2. Verifica que MongoDB esté corriendo
3. Asegúrate de tener todas las dependencias instaladas
4. Revisa los logs del servidor en la consola

---

⭐ Si este proyecto te fue útil, dale una estrella en GitHub

📚 Para más información sobre las tecnologías usadas:
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/docs/)
- [Mongoose](https://mongoosejs.com/)
- [Handlebars](https://handlebarsjs.com/)