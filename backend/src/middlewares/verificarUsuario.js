const Usuario = require(`../database/models/usuario-model`);
const Rol = ["admin", "moderador", "cliente"];

const validarEmailUnico = async (req,res,next)=>{
    try{
        const usuario = await Usuario.findOne({
            where: {email: req.body.email}
        });

        if(usuario) {
            return res.status(400).send({message: `El email ${req.body.email} ya esta en uso`});
        }

        next();

    } catch (err) {
        return res.status(500).send({message: "Error al validar email", error: err.message});
    }
}


const validarRol = async (req, res, next) => {
    try {

        //Id
        if (req.body.rolId) {
            const rol = await RolModel.findByPk(req.body.rolId);

            if (!rol) {
                return res.status(400).send({ message: "El rol no existe" });
            }
        }

        //nombre
        if (req.body.rol) {
            const rol = await RolModel.findOne({
                where: { nombre: req.body.rol }
            });

            if (!rol) {
                return res.status(400).send({ message: "El rol no existe" });
            }

            req.body.rolId = rol.id;
        }

        next();

    } catch (err) {
        return res.status(500).send({
            message: "Error al validar rol",
            error: err.message
        });
    }
};

const verificarLogin = {
    validarEmailUnico,
    validarRol,
};

module.exports = verificarLogin;