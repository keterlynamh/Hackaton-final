const Cupon = require(`../database/models/cupon-model`);

exports.crearCupon = (req,res) => {
    const cuponNuevo = {
        codigo: req.body.codigo,
        descuentoId: req.body.descuentoId,
        fechaExpiracion: req.body.fechaExpiracion,
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
        descuentoId: req.body.descuentoId,
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

