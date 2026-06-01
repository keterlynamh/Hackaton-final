const Cupon = require(`../database/models/cupon-model`);

exports.crearCupon = (req,res) => {
    const cuponNuevo = {
        codigo: req.body.codigo,
        porcentaje: req.body.porcentaje,
        fechaExpiracion: req.body.fechaExpiracion,
        estado: true
    }

    Cupon.create(cuponNuevo).then(data=>{
        res.status(201).send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
    
}

exports.editarCupon = (req,res) => {
    let cuponId = req.param.id;
    
    const cuponNuevo = {    
        codigo: req.body.codigo,
        porcentaje: req.body.porcentaje,
        fechaExpiracion: req.body.fechaExpiracion,
    }
    Cupon.update(cuponNuevo,{
        where: {id: cuponId}
    }).then(data=>{
        res.status(200).send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
}

exports.eliminarCupon = (req,res) => {
    let cuponId = req.params.id
    Cupon.destroy({
        where: {id: cuponId}
    }).then(data=>{
        res.status(200).send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
}

exports.todosLosCupones= (req,res) => {
    Cupon.findAll({
    }).then(data=>{
        res.status(200).send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
}

exports.cuponPorId = (req,res) => {
    let cuponId = req.params.id;

    Cupon.findByPk(cuponId).then(data=>{
        if(!data){
            return res.status(404).send({message:"Cupon no encontrado"})
        }
        res.status(200).send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
}

exports.validarCupon = (req, res) => {
    res.status(200).json({
        valido: true,
        codigo: req.cupon.codigo,
        porcentaje: req.cupon.porcentaje
    });
};