const Pago = require("../database/models/pago-model");
const Checkout = require("../database/models/checkout-model");
const DetalleCheckout = require("../database/models/checkout-detalle-model");
const Producto = require("../database/models/producto-model");

exports.misCompras = async (req, res) => {
    try {

        const compras = await Pago.findAll({
            include: [
                {
                    model: Checkout,
                    where: {
                        usuarioId: req.usuarioId
                    },
                    include: [
                        {
                            model: DetalleCheckout,
                            include: [
                                {
                                    model: Producto
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        res.status(200).json(compras);

    } catch (error) {
        res.status(500).json(error);
    }
};