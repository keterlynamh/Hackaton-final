const Producto = require(`../database/models/producto-model`);
const Cupon = require(`../database/models/cupon-model`);
const Checkout = require(`../database/models/checkout-model`);
const DetalleCheckout = require(`../database/models/checkout-detalle-model`);

exports.crearCheckout = async (req,res) => {
    try {
        const { productos, codigo } = req.body;

        let subtotal = 0;
        let descuento = 0;
        let cuponId = null;

        const detalleProductos = [];

        for (const item of productos) {
            
            const producto = await Producto.findByPk(item.productoId);
            
            if (!producto) {
                
                return res.status(404).json({
                    message: `Producto ${item.productoId} no encontrado`
                });
            }

            const precioUnitario = Number(producto.precio);
            
            subtotal += precioUnitario * item.cantidad;
            
            detalleProductos.push({
                productoId: producto.id,
                cantidad: item.cantidad,
                precioUnitario
            });
        }

        if (codigo) {
            const cupon = await Cupon.findOne({
                where: { codigo, estado: true}
            });

            if (!cupon) {
                return res.status(404).json({
                    message: "Cupón no válido"
                });
            }

            if (new Date() > cupon.fechaExporiracion) {
                return res.status(400).json({
                    message: "Cupón expirado"
                });
            }

            cuponId = cupon.id;

            descuento = subtotal * (cupon.porcentaje / 100);
        }

        const total = subtotal - descuento; 

        const checkout = await Checkout.create({
            usuarioId: req.usuarioId,
            cuponId,
            subtotal,
            descuento,
            total
        });

        for (const item of detalleProductos) {
            
            await DetalleCheckout.create({
                checkoutId: checkout.id,
                productoId: item.productoId,
                cantidad: item.cantidad,
                precioUnitario: item.precioUnitario
            });
        }

        res.status(201).json({
            message: "Checkout creado correctamente",
            checkout
        });

    } catch (error) {
        res.status(500).json(error);
        
    }
};

exports.todosLosCheckout = async (req, res) => {
    try {

        const checkouts = await Checkout.findAll({
            where: {
                usuarioId: req.usuarioId
            },
            include: [
                {
                    model: Cupon
                },
                {
                    model: DetalleCheckout,
                    include: [
                        {
                            model: Producto
                        }
                    ]
                }
            ]
        });

        res.status(200).json(checkouts);

    } catch (error) {
        res.status(500).json(error);
    }
};

exports.obtenerCheckoutPorId = async (req, res) => {
    try {

        const checkoutId = req.params.id;

        const checkout = await Checkout.findByPk(checkoutId, {
            include: [
                {
                    model: Cupon
                },
                {
                    model: DetalleCheckout,
                    include: [
                        {
                            model: Producto
                        }
                    ]
                }
            ]
        });

        if (!checkout) {
            
            if (checkout.usuarioId !== req.usuarioId) {
                return res.status(403).json({
                    message: "No autorizado"
                });
            }

            return res.status(404).json({
                message: "Checkout no encontrado"
            });
        }

        res.status(200).json(checkout);

    } catch (error) {
        res.status(500).json(error);
    }
};

