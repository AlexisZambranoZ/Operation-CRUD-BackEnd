import express from 'express';
import db from './config/db.js';
import Usuario from './models/Usuario.js';
import cors from 'cors';

const app = express();

app.use(express.json());

// Habilitar CORS para todas las rutas
app.use(cors());
// Definir la ruta POST para /usuarios
app.post('/usuarios', async (req, res) => {
  try {
    console.log("Creando...");
    // Obtener los datos del usuario desde el cuerpo de la petición
    const { nombre, email, password } = req.body

    // Crear el usuario utilizando el modelo de usuario
    const usuario = await Usuario.create({ nombre, email, password })

    // Enviar una respuesta con el usuario creado
    res.status(201).json(usuario)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al crear el usuario' })
  }
});

// Definir la ruta DELETE para /usuarios/:id
app.delete('/usuarios/:id', async (req, res) => {
  try {
    // Obtener el id del usuario a eliminar desde los parámetros de la petición
    const { id } = req.params

    // Buscar y eliminar el usuario por su id utilizando el modelo de usuario
    const usuarioEliminado = await Usuario.destroy({ where: { id } })

    if (usuarioEliminado === 0) {
      // Si el usuario no existe, enviar una respuesta con un mensaje de error
      res.status(404).json({ mensaje: 'El usuario no existe' })
    } else {
      // Si el usuario fue eliminado correctamente, enviar una respuesta con un mensaje de éxito
      res.status(200).json({ mensaje: 'El usuario fue eliminado correctamente' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al eliminar el usuario' })
  }
})


app.get('/usuarios', async (req, res) => {
  try {
    console.log("Obteniendo todos los usuarios...");
    // Obtener todos los usuarios utilizando el modelo de usuario
    const usuarios = await Usuario.findAll()

    // Enviar una respuesta con los usuarios encontrados
    res.status(200).json(usuarios)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al obtener los usuarios' })
  }
});

app.put('/usuarios/:id', async (req, res) => {
  try {
    console.log("Actualizando usuario...");
    const id = req.params.id;
    // Obtener los datos del usuario desde el cuerpo de la petición
    const { nombre, email, password } = req.body

    // Buscar el usuario a actualizar utilizando el modelo de usuario
    const usuario = await Usuario.findByPk(id)

    // Actualizar los datos del usuario
    usuario.nombre = nombre
    usuario.email = email
    usuario.password = password

    // Guardar los cambios en la base de datos
    await usuario.save()

    // Enviar una respuesta con el usuario actualizado
    res.status(200).json(usuario)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al actualizar el usuario' })
  }
});



//Hablilitar lectura
app.use(express.urlencoded({ extenden: true }))

try {
    await db.authenticate();
    console.log('Conexión a la base de datos establecida');
     await Usuario.sync();
    console.log('Tabla de usuarios creada en la base de datos');
  } catch (error) {
    console.error('Error creando la tabla:', error);
  }

//Definir el puerto
const port = 3000

app.listen(port, () => {
    console.log("Servidor Funcionando en el puerto", port);
})
