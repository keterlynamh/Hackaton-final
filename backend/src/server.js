console.log(`Inicio de la aplicacion`);
require(`dotenv`).config();

const app = require(`./app`);
const db = require(`./config/db`);
const sequelize = require("./database/models").sequelize;
const { Rol } = require("./database/models");

const PORT = process.env.PORT;

const { Categoria } = require("./database/models"); // importa tu modelo

async function crearCategorias() {
    const count = await Categoria.count();

    if (count === 0) {
        await Categoria.bulkCreate([
            { nombre: "bocaditos", estado: true },
            { nombre: "panes", estado: true },
            { nombre: "postres", estado: true }
        ]);

        console.log("Categorias creadas correctamente");
    } else {
        console.log("Las categorias ya existen");
    }
}

async function crearRoles() {
    try {
        const count = await Rol.count();

        if (count === 0) {
            await Rol.bulkCreate([
                { nombre: "admin" },
                { nombre: "moderador" },
                { nombre: "usuario" }
            ]);

            console.log("Roles creados correctamente");
        } else {
            console.log("Los roles ya existen");
        }

    } catch (error) {
        console.error("Error al crear roles:", error);
    }
}

async function startServer() {
    await sequelize.authenticate()
    console.log("Base de datos conectada");

    await sequelize.sync();
    console.log("Tabla de datos creada")
    await crearRoles();

    await crearCategorias();


    app.listen(PORT, ()=>{
        console.log(`Conectado al puerto ${PORT}`);
    });
}

startServer();