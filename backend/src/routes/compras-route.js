const comprasRouter = require("express").Router();
const controller = require("../controllers/compras-controller");
const authJWT = require("../middlewares/authJWT");


comprasRouter.get(
    "/mis-compras",
    authJWT.verificarToken,
    controller.misCompras
);

module.exports = comprasRouter;