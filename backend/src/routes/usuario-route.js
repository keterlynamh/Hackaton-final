const usuarioRouter = require(`express`).Router();
const controller = require(`../controllers/usuario-controller`);
const { verificarUsuario, authJWT } = require(`../middlewares/index`);


usuarioRouter.post(`/`,
    verificarUsuario.validarEmailUnico,
    verificarUsuario.validarRol,
    controller.CrearUsuario
);

usuarioRouter.post(`/login`, controller.loginUsuario);

usuarioRouter.delete(`/:id`,
    authJWT.verificarToken,
    authJWT.esAdmin,
    controller.eliminarUsuario
);

usuarioRouter.put(`/:id`,
    authJWT.verificarToken,
    authJWT.esAdmin,
    controller.editarUsuario
);

usuarioRouter.get(`/:id`,
    authJWT.verificarToken,
    authJWT.esAdminOModerador,
    controller.usuarioPorId
);

usuarioRouter.get(`/`,
    authJWT.verificarToken,
    authJWT.esAdminOModerador,
    controller.todosLosUsuarios
);


module.exports = usuarioRouter;