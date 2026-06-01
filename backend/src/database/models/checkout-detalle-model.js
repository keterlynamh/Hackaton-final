const{ DataTypes } = require(`sequelize`);
const sequelize = require(`../../config/db`);

const DetalleCheckout = sequelize.define(`detalle`, {
    checkoutId: { type: DataTypes.INTEGER, allowNull: false, references:{
        model:"checkout",
        key:"id"
    }},
    productoId:{ type: DataTypes.INTEGER, allowNull: false, references:{
        model:"productos",
        key:"id"
    }},
    cantidad: { type: DataTypes.INTEGER, allowNull: false},
    precioUnitario: { type: DataTypes.DECIMAL(10,2), allowNull: false}
}, {tableName: "detalleCheckout"})

module.exports = DetalleCheckout;
