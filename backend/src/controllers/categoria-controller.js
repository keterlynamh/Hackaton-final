const Categoria = require(`../database/models/categoria-model`);
const Producto = require(`../database/models/producto-model`);

exports.crearCategoria = (req,res) => {
    const categoriaNueva= {
        nombre: req.body.nombre
    };

    Categoria.create(categoriaNueva).then(data=>{
        res.status(201).send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
}

exports.editarCategoria = async (req,res) => {
    try {
        
        let categoriaId = req.params.categoriaId;
        
        const nombre = req.body.nombre;

        const categoriaNueva = await Categoria.findByPk(categoriaId);
        if (!categoriaNueva) {
            return res.status(404).send({ message: "Categoria no encontrada" });
        }

        categoriaNueva.nombre = nombre;
        categoriaNueva.editadoPor = usuarioId;
        await categoriaNueva.save();

        res.status(200).send({
            message: "Categoria actualizada",
            categoriaNueva
        });

    } catch (error) {
        res.status(500).send({ message: "Error al editar categoria", error });
    }
}

exports.eliminarCategoria = (req,res) => {
    let categoriaId = req.params.categoriaId

    Categoria.destroy({
        where: {id: categoriaId}
    }).then(data=>{
        res.status(200).send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
}

exports.categoriaPorId = (req,res)=>{
    let categoriaId = req.params.id
    Categoria.findOne({
        where: {id: categoriaId}
    }).then(data=>{
        res.status(200).send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
}

exports.todasLasCategorias = (req,res)=>{
    Categoria.findAll({
    }).then(data=>{
        res.status(200).send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
}

exports.productosPorCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const categoria = await Categoria.findByPk(id, {
            include: [{
                model: Producto,
                as: 'productos'
            }]
        });

        if (!categoria) {
            return res.status(404).json({ mensaje: "Categoría no encontrada" });
        }

        res.json(categoria.productos);

    } catch (error) {
        res.status(500).json({ mensaje: message.error });
    }
};