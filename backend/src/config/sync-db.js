const { sequelize, Rol } = require(`../database/models`);
 
module.exports = async function syncDB() {
    try {
        const strategy = process.env.DB_SYNC || `none`;
        const options = {logging: false}; 
    
        if(strategy=== `alter`) options.alter = true;
        if(strategy=== `force`) options.force = true;

        console.log(`[sync] strategy = ${strategy}`);
        await sequelize.sync(options);

        console.log(`Base de datos sincronizada`);

        const roles = ["admin", "moderador", "cliente"];

        for (const name of roles) {
            await Rol.findOrCreate({ where: { name } });
        }
    } catch (error) {
        console.error(error);
    }
};
