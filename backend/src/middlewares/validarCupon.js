const Cupon= require(`../database/models/cupon-model`);

const validarCupon = async (req,res, next) => {
    try {
        
        const { codigo } = req.body;
        
        if(!codigo) {
            return next();
        }
        
        const cupon = await Cupon.findOne({
            where: { codigo: codigo,
                estado: true    
            }
        });
        
        if(!cupon) {
            return res.status(404).json({message: "Cupón no válido"});
        }
        
        if (new Date() > cupon.fechaExpiracion) {
            return res.status(400).json({
                message: "Cupón expirado"
            });
        }
        
        req.cupon = cupon;
        
        next()
    
    } catch (error) {
        res.status(500).json(error);
    }
};


module.exports = validarCupon;