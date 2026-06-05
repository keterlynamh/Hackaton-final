const express = require(`express`);
const checkoutRouter = require(`express`).Router();
const  controller = require(`../controllers/checkout-controller`);
const authJWT = require(`../middlewares/authJWT`);

checkoutRouter.post("/",
    authJWT.verificarToken,
    controller.crearCheckout
);

checkoutRouter.get("/",
    authJWT.verificarToken,
    controller.todosLosCheckout
);

checkoutRouter.get("/:id",
    authJWT.verificarToken,
    controller.obtenerCheckoutPorId
);

module.exports = checkoutRouter;
