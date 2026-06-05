const Pago = require("../database/models/pago-model");
const Checkout = require("../database/models/checkout-model");

exports.obtenerCarrito = async (req, res) => {
    try {

        const checkout = await Checkout.findByPk(req.params.checkoutId);

        if (!checkout) {
            return res.status(404).json({
                message: "Checkout no encontrado"
            });
        }

        res.status(200).json(checkout);

    } catch (error) {
        res.status(500).json(error);
    }
};

exports.pagar = async (req, res) => {
    try {

        const { checkoutId } = req.body;

        const checkout = await Checkout.findByPk(checkoutId);

        if (!checkout) {
            return res.status(404).json({
                message: "Checkout no encontrado"
            });
        }

        const pago = await Pago.create({
            checkoutId,
            monto: checkout.total,
            estado: "pagado",
            codigoOperacion: "PAY-" + Date.now()
        });

        res.status(201).json({
            message: "Pago realizado correctamente",
            pago
        });

    } catch (error) {
        res.status(500).json(error);
    }
};

exports.cambiarEstado = async (req, res) => {
    try {

        const pago = await Pago.findByPk(req.params.id);

        if (!pago) {
            return res.status(404).json({
                message: "Pago no encontrado"
            });
        }

        pago.estado = req.body.estado;

        await pago.save();

        res.status(200).json(pago);

    } catch (error) {
        res.status(500).json(error);
    }
};