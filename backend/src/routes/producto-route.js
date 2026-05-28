const express = require(`express`);
const productoRouter = require(`express`).Router();
const controller = require(`../controllers/producto-controller`);
const authJWT = require(`../middlewares/authJWT`);

productoRouter.post(`/`,
    authJWT.verificarToken,
    authJWT.esAdmin,
    controller.crearProducto
);

productoRouter.put(`/:id`,
    authJWT.verificarToken,
    authJWT.esAdminOModerador,
    controller.editarProducto
);

productoRouter.delete(`/:id`,
    authJWT.verificarToken,
    authJWT.esAdmin,
    controller.eliminarProducto
);

productoRouter.get(`/:id`, controller.productoPorId);
productoRouter.get(`/`, controller.todosLosProductos);

module.exports = productoRouter;