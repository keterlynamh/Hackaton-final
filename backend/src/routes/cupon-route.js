const express = require(`express`);
const cuponRouter = require(`express`).Router();
const controller = require(`../controllers/cupon-controller`);
const authJWT = require(`../middlewares/authJWT`);
const validarCupon = require(`../middlewares/validarCupon`);

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

cuponRouter.get(`/`,

    authJWT.verificarToken,
    authJWT.esAdminOModerador,
    controller.todosLosCupones
);

cuponRouter.get(`/:id`,

    authJWT.verificarToken,
    authJWT.esAdminOModerador,
    controller.cuponPorId
);


cuponRouter.post(

    "/validar",
    authJWT.verificarToken,
    validarCupon,
    controller.validarCupon
);

module.exports = cuponRouter;