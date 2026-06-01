const sequelize = require("../../config/db");

const Usuario = require("./usuario-model");
const Rol = require("./rol-model");
const Producto = require(`./producto-model`);
const Categoria = require("./categoria-model");
const Cupon = require(`./cupon-model`);
const Checkout = require(`./checkout-model`);
const DetalleCheckout = require(`./checkout-detalle-model`);


// rol-usuario
Rol.hasMany(Usuario, { foreignKey: "rolId" });
Usuario.belongsTo(Rol, { foreignKey: "rolId" });

//categoria-producto
Categoria.hasMany(Producto, { foreignKey: "categoriaId"});
Producto.belongsTo(Categoria, { foreignKey: "categoriaId"});

//usuario - checkout
Usuario.hasMany(Checkout, { foreignKey:"usuarioId"});
Checkout.belongsTo(Usuario, { foreignKey:"usuarioId"});

//cupon-checkout
Cupon.hasMany(Checkout, { foreignKey:"cuponId"});
Checkout.belongsTo(Cupon, { foreignKey:"cuponId"});

//checkout-detalle
Checkout.hasMany(DetalleCheckout, { foreignKey: "checkoutId"});
DetalleCheckout.belongsTo(Checkout, {foreignKey: "checkoutId"});

//producto-detalle
Producto.hasMany(DetalleCheckout, { foreignKey: "productoId"});
DetalleCheckout.belongsTo(Producto, { foreignKey: "productoId"});

module.exports = { sequelize, Usuario, Rol, Categoria, Producto, Cupon, Checkout, DetalleCheckout };