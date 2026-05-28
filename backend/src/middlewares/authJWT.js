const Usuario = require(`../database/models/usuario-model`);
const Rol = require(`../database/models/rol-model`);
const jwt = require(`jsonwebtoken`);


const verificarToken = (req, res, next) => {
    
    let token = req.session?.token;
    if(!token) return res.status(401).send({message:`No estas enviando el token`});
    jwt.verify(token, process.env.JWT_SECRET,(err,decoded)=>{
        if(err) return res.status(401).send({message:`Token invalido`});
        req.usuarioId = decoded.id;
        next();
    });
}

const esModerador = async (req,res,next) => {
    try {
        const usuario = await Usuario.findByPk(req.usuarioId, {
            include: [{ model: Rol }]
        });

        if(!usuario) return res.status(404).send({message: `Usuario no encontrado`});
        
        if (usuario.Rol && usuario.Rol.nombre === "moderador") {
            return next();
        }

        return res.status(403).send({message: `Se requiere rol de moderador `});

    } catch (error) {
        return res.status(500).send({message: error});
    }
};

const esAdmin = async (req,res,next) => {
    try {
        const usuario = await Usuario.findByPk(req.usuarioId, {
            include: [{ model: Rol }]
        });

        if(!usuario) return res.status(404).send({message: `Usuario no encontrado`});
        
        if (usuario.Rol && usuario.Rol.nombre === "admin") {
            return next();
        }

        return res.status(403).send({message: `Se requiere rol de admin `});

    } catch (error) {
        return res.status(500).send({message: error.message});
    }
};


const esAdminOModerador = async (req,res,next) => {
    try {
        const usuario = await Usuario.findByPk(req.usuarioId, {
            include: [{ model: Rol }]
        });

        if(!usuario) return res.status(404).send({message: `Usuario no encontrado`});

        const rol = usuario.Rol?.nombre;
        
        if (rol === "admin" || rol === "moderador") {
            return next();
        }

        return res.status(403).send({message: `Se requiere rol de admin o moderador `});

    } catch (error) {
        return res.status(500).send({message: error.message});
    }
};
const authJWT = {
    verificarToken,
    esModerador,
    esAdmin,
    esAdminOModerador
}

module.exports = authJWT;