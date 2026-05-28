const { DataTypes } = require(`sequelize`);
const sequelize = require(`../../config/db`);

const Categoria = sequelize.define("Categoria",{
    nombre: { type: DataTypes.STRING, allowNull: false},
    estado: { type: DataTypes.BOOLEAN, defaultValue: true}

}, {tableName: "categorias"});

module.exports = Categoria;