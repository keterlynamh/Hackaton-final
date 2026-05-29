const { DataTypes } = require(`sequelize`);
const sequelize = require(`../../config/db`);

const Cupon = sequelize.define("Cupon",{
    codigo: { type: DataTypes.STRING, allowNull: false, unique: true},
    porcentaje: { type: DataTypes.FLOAT, allowNull: false},
    fechaExpiracion: { type: DataTypes.DATE, allowNull: false},
    estado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},

}, {tableName:"cupones"});

module.exports = Cupon;