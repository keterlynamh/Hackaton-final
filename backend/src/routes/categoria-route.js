const express = require(`express`);
const categoriaRouter = require(`express`).Router();
const controller = require(`../controllers/categoria-controller`);
const authJWT = require(`../middlewares/authJWT`);

categoriaRouter.post(`/`,
    authJWT.verificarToken,
    authJWT.esAdmin,
    controller.crearCategoria
);

categoriaRouter.put(`/:id`,
    authJWT.verificarToken,
    authJWT.esAdminOModerador,
    controller.editarCategoria
);

categoriaRouter.delete(`/:id`,
    authJWT.verificarToken,
    authJWT.esAdmin,
    controller.eliminarCategoria
);

categoriaRouter.get(`/:id`, controller.categoriaPorId);
categoriaRouter.get(`/`, controller.todasLasCategorias);
categoriaRouter.get(`/:id/productos`, controller.productosPorCategoria);

module.exports = categoriaRouter;