const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Pago = sequelize.define("pago", {
    checkoutId: { type: DataTypes.INTEGER, allowNull: false},
    monto: { type: DataTypes.DECIMAL(10,2), allowNull: false},
    estado: { type: DataTypes.STRING, defaultValue: "pendiente"},
    codigoOperacion: {type: DataTypes.STRING}
}, {tableName: "pagos"});

module.exports = Pago;