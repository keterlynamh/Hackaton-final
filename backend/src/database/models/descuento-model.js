const {DataTypes} = require(`sequelize`);
const sequelize = require(`../../config/db`);

const Descuento = sequelize.define("Descuento",{
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {tableName: "descuentos"});

module.exports = Descuento;   