const Usuario = require(`../database/models/usuario-model`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const Rol = require(`../database/models/rol-model`);

exports.CrearUsuario = async (req, res) => {
    try {

        let rolIdFinal = req.body.rolId;

        if (!rolIdFinal && req.body.rol) {
            const rol = await Rol.findOne({
                where: { nombre: req.body.rol }
            });

            if (!rol) {
                return res.status(400).send({ message: "Rol no existe" });
            }

            rolIdFinal = rol.id;
        }

        const usuarioNuevo = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            rolId: rolIdFinal,
            estado: req.body.estado || true
        };

        const data = await Usuario.create(usuarioNuevo);
        res.status(201).send(data);

    } catch (error) {
        res.status(500).send(error);
    }
};

exports.editarUsuario = async (req,res)=>{
    let usuarioId = req.params.id;
    
    const usuario = await Usuario.findByPk(usuarioId);
    
    if (!usuario) {
        
        return res.status(404).send({ message: "Usuario no encontrado" });
    }

    const usuarioNuevo = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password:  bcrypt.hashSync(req.body.password, 8),
        rolId: req.body.rold,
        estado: req.body.estado || true
    };
    Usuario.update(usuarioNuevo,{
        where: {id: usuarioId}
    }).then(data=>{
        res.status(200).send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
}

exports.eliminarUsuario = (req,res)=>{
    let usuarioId = req.params.id
    Usuario.destroy({
        where: {id: usuarioId}
    }).then(data=>{
        res.status(200).send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
}

exports.usuarioPorId = (req,res)=>{
    let usuarioId = req.params.id
    Usuario.findOne({
        where: {id: usuarioId}
    }).then(data=>{
        res.status(200).send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
}

exports.todosLosUsuarios = (req,res)=>{
    Usuario.findAll({
        where: { estado: true }
    }).then(data=>{
        res.status(200).send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
}

exports.loginUsuario = async (req,res) =>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        if(!email || !password) {
            return res.status(400).send({ message: "Email y password requeridos"});
        }
        
        const usuario = await Usuario.findOne({
            where: {email: email}
        })
        
        if (!usuario) {
            return res.status(404).send({ message: "Usuario no encontrado"});
        }
        
        const passwordValido = bcrypt.compareSync(password, usuario.password);
        if (!passwordValido) {
            return res.status(401).send({message: "Contraseña incorrecta"});
        }
        
        const token = jwt.sign(
            { id: usuario.id },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400
            }
        );

        req.session.token = token;
        
        res.status(200).send({
            message: "Inicio de sesion correcto",
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rolId: usuario.rolId
            }
        });
    } catch (error) {
        res.status(500).send({
            message: "Error en login",
            error: error.message
        })
    }
};