const {DataTypes} = require(`sequelize`);
const sequelize = require(`../../config/db`);

const Rol = sequelize.define("Rol",{
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {tableName: "rols"});

module.exports = Rol;   