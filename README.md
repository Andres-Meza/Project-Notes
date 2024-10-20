# Project Notes

## Descripción

**Project Notes** es una API construida con Node.js que permite la gestión de estudiantes, materias y autenticación de usuarios. El proyecto sigue una arquitectura organizada por controladores, modelos, middlewares y rutas, y está diseñado para ejecutarse en contenedores Docker. También incluye pruebas unitarias para garantizar la calidad del código.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

```bash
project-notes/
│
├── config/                 # Archivos de configuración
├── controllers/            # Controladores de la lógica de la aplicación
│   ├── authController.js    # Controlador de autenticación
│   ├── studentController.js # Controlador de estudiantes
│   └── subjectController.js # Controlador de materias
│
├── docker/                 # Configuración de Docker
│   ├── dockerfile
│   └── docker-compose.yml
│
├── middlewares/            # Middlewares para autenticación y otras funcionalidades
│   └── authMiddlewares.js
│
├── models/                 # Modelos de datos (esquemas de la base de datos)
│   ├── studentModel.js      # Modelo para estudiantes
│   ├── subjectModel.js      # Modelo para materias
│   └── userModel.js         # Modelo para usuarios
│
├── routes/                 # Definición de las rutas de la API
│   ├── auths.js             # Rutas de autenticación
│   ├── students.js          # Rutas de gestión de estudiantes
│   └── subjects.js          # Rutas de gestión de materias
│
├── test/                   # Pruebas del proyecto
│   ├── student.test.js          # Pruebas del modelo de estudiantes
│   ├── studentController.test.js # Pruebas del controlador de estudiantes
│   ├── subjects.test.js          # Pruebas del modelo de materias
│   └── subjectsController.test.js # Pruebas del controlador de materias
│
├── .env                    # Variables de entorno
├── .gitignore              # Archivos ignorados por Git
├── app.js                  # Punto de entrada principal de la aplicación
├── main.js                 # Configuración del servidor
├── package.json            # Dependencias y scripts del proyecto
├── README.md               # Documentación del proyecto
```

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 12 o superior)
- [Docker](https://www.docker.com/)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Instalación

1. Clona este repositorio:

	 ```bash
	 git clone https://github.com/tu-usuario/project-notes.git
	 ```

2. Navega al directorio del proyecto:

	 ```bash
	 cd project-notes
	 ```

3. Instala las dependencias:

	 ```bash
	 npm install
	 ```

4. Crea un archivo `.env` con tus configuraciones de entorno:

	 ```bash
	 PORT=3000
	 DB_URI=mongodb://localhost:27017/project-notes
	 JWT_SECRET=your_jwt_secret
	 ```

## Uso

### Iniciar el Servidor Localmente

Ejecuta el siguiente comando para iniciar el servidor:

```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`.

### Docker

Para ejecutar el proyecto usando Docker:

```bash
docker-compose up
```

Esto levantará el proyecto en contenedores separados.

## API Endpoints

### Autenticación

- **POST** `/auth/login`: Iniciar sesión.
- **POST** `/auth/register`: Registrar un nuevo usuario.

### Estudiantes

- **GET** `/students`: Obtener todos los estudiantes.
- **POST** `/students`: Crear un nuevo estudiante.
- **GET** `/students/:id`: Obtener detalles de un estudiante.
- **PUT** `/students/:id`: Actualizar un estudiante.
- **DELETE** `/students/:id`: Eliminar un estudiante.

### Materias

- **GET** `/subjects`: Obtener todas las materias.
- **POST** `/subjects`: Crear una nueva materia.
- **GET** `/subjects/:id`: Obtener detalles de una materia.
- **PUT** `/subjects/:id`: Actualizar una materia.
- **DELETE** `/subjects/:id`: Eliminar una materia.

## Pruebas

Este proyecto incluye pruebas para verificar la funcionalidad de los controladores y modelos.

Para ejecutar las pruebas, usa el siguiente comando:

```bash
npm test
```

## Tecnologías Utilizadas

- **Node.js**
- **Express**
- **MongoDB** y **Mongoose**
- **JWT** para autenticación
- **Docker**
- **Mocha** para pruebas

## Contribuciones

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-feature`).
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva feature'`).
4. Haz push a la rama (`git push origin feature/nueva-feature`).
5. Abre un pull request.

## Créditos

- Proyecto desarrollado por [Andres Meza](https://github.com/usuario).
- Información de Pokémon obtenida de la [Pokémon API](https://pokeapi.co/).

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).
