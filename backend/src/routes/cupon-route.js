const express = require(`express`);
const cuponRouter = require(`express`).Router();
const controller = require(`../controllers/cupon-controller`);
const authJWT = require(`../middlewares/authJWT`);

cuponRouter.post(`/`,
    
    authJWT.verificarToken,
    authJWT.esAdmin,
    controller.crearCupon
);

cuponRouter.put(`/:id`,
    
    authJWT.verificarToken,
    authJWT.esAdmin,
    controller.editarCupon
);

cuponRouter.delete(`/:id`,

    authJWT.verificarToken,
    authJWT.esAdmin,
    controller.eliminarCupon
);

module.exports = cuponRouter;