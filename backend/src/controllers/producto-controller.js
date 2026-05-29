const Producto = require(`../database/models/producto-model`);
const Usuario = require(`../database/models/usuario-model`);
const jwt = require(`jsonwebtoken`);

exports.crearProducto = (req,res) => {
    const productoNuevo = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        categoriaId: req.body.categoriaId
    };

    Producto.create(productoNuevo).then(data=>{
        res.status(201).send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
}

exports.editarProducto = async (req,res) => {
    try {
        
        let productoId = req.params.productoId;
        
        const { nombre, descripcion, precio } = req.body;

        const productoNuevo = await Producto.findByPk(productoId);
        if (!productoNuevo) {
            return res.status(404).send({ message: "Producto no encontrado" });
        }

        productoNuevo.nombre = nombre;
        productoNuevo.descripcion = descripcion;
        productoNuevo.precio = precio;
        productoNuevo.categoriaId = categoriaId;
        
        await productoNuevo.save();

        res.status(200).send({
            message: "Producto actualizado",
            productoNuevo
        });
        
    } catch (error) {
        res.status(500).send({ message: "Error al editar producto"});
    }
}

exports.eliminarProducto = (req,res) => {
    let productoId = req.params.productoId

    Producto.destroy({
        where: {id: productoId}
    }).then(data=>{
        res.status(200).send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
}

exports.productoPorId = (req,res)=>{
    let productoId = req.params.id
    Producto.findOne({
        where: {id: productoId}
    }).then(data=>{
        res.status(200).send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
}

exports.todosLosProductos = (req,res)=>{
    Producto.findAll({
    }).then(data=>{
        res.status(200).send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
}