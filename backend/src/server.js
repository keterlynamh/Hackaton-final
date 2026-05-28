console.log(`Inicio de la aplicacion`);
require(`dotenv`).config();

const app = require(`./app`);
const db = require(`./config/db`);
const sequelize = require("./database/models").sequelize;

const PORT = process.env.PORT;

async function startServer() {
    await sequelize.authenticate();
    console.log("Base de datos conectada");

    await sequelize.sync({ alter: true });
    console.log("Tablas sincronizadas");

    app.listen(PORT, ()=>{
        console.log(`Conectado al puerto ${PORT}`);
    });
}

startServer();