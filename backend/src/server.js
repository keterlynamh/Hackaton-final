console.log(`Inicio de la aplicacion`);
require(`dotenv`).config();

const app = require(`./app`);
const sequelize = require("./config/db");
const { crearCategorias, crearRoles } = require(`./seed/seed`);


const PORT = process.env.PORT;

async function startServer() {

    await sequelize.authenticate()
    console.log("Base de datos conectada");

    await sequelize.sync({ alter: true});
    console.log("Tabla de datos creada");

    await crearRoles();
    await crearCategorias();


    app.listen(PORT, ()=>{
        console.log(`Conectado al puerto ${PORT}`);
    });
}

startServer();