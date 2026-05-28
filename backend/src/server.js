console.log(`Inicio de la aplicacion`);
require(`dotenv`).config();

const app = require(`./app`);
const syncDB = require(`./config/sync-db`);
const {sequelize} = require(`./database/models/usuario-model`);

const PORT = process.env.PORT;

async function startServer() {
    await syncDB();

    app.listen(PORT, ()=>{
        console.log(`Conectado al puerto ${PORT}`);
    });
}

startServer();