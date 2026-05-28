const sequelize = require("../../config/db");

const Usuario = require("./usuario-model");
const Rol = require("./rol-model");
const Producto = require(`./producto-model`);
const Categoria = require("./categoria-model");

// rol-usuario
Rol.hasMany(Usuario, { foreignKey: "rolId" });
Usuario.belongsTo(Rol, { foreignKey: "rolId" });

//categoria-producto
Categoria.hasMany(Producto, { foreignKey: "categoriaId"});
Producto.belongsTo(Categoria, { foreignKey: "categoriaId"});

module.exports = { sequelize, Usuario, Rol, Categoria, Producto };