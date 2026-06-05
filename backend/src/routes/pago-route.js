const pagoRouter = require("express").Router();
const controller = require("../controllers/pago-controller");
const authJWT = require("../middlewares/authJWT");

pagoRouter.get(
    "/carrito/:checkoutId",
    authJWT.verificarToken,
    controller.obtenerCarrito
);

pagoRouter.post(
    "/pagar",
    authJWT.verificarToken,
    controller.pagar
);

pagoRouter.patch(
    "/:id/estado",
    authJWT.verificarToken,
    controller.cambiarEstado
);

module.exports = pagoRouter;