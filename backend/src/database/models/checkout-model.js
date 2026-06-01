const { DataTypes } = require(`sequelize`);
const sequelize = require(`../../config/db`);

const Checkout = sequelize.define(`checkout`,{
    usuarioId: { type: DataTypes.INTEGER, allowNull: false, references: {
        model: "usuarios",
        key: "id"
    }},
    cuponId: { type: DataTypes.INTEGER, allowNull: true, references:{
        model:"cupones",
        key: "id"
    }},
    subtotal: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue:0},
    descuento: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue:0},
    total: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue:0 }

}, { tableName: "checkout"})

module.exports = Checkout;