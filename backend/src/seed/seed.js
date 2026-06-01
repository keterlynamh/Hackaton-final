const { Rol, Categoria } = require("../database/models");

async function crearCategorias() {
    const count = await Categoria.count();
    try{
        
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
    } catch (error) {
        console.error("Error al crear roles");
    } 
}

async function crearRoles() {
    const count = await Rol.count();
    try {

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
        console.error("Error al crear roles");
    }
}

module.exports = {
    crearRoles,
    crearCategorias
}
