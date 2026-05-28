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


const validarRol = (req,res,next) =>{
    if(req.body.rolId){
        for (let index = 0; index < req.body.rolId.length; index++) {
            const rolUsuario = req.body.rolId[index];

            if(!Rol.includes(rolUsuario)) {
                return res.status(400).send({message:`El rol no existe`})
            }
            
        }
    }

    next();
};

const verificarLogin = {
    validarEmailUnico,
    validarRol,
};

module.exports = verificarLogin;