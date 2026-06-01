const {DataTypes} = require(`sequelize`);
const sequelize = require(`../../config/db`);

const Usuario = sequelize.define("Usuario",{
    nombre: { type: DataTypes.STRING, allowNull: false},
    apellido: { type: DataTypes.STRING, allowNull: false},
    email: { type: DataTypes.STRING, allowNull:false, unique: true},
    password:{ type: DataTypes.STRING, allowNull: false},
    fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
    estado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
    rolId: { type: DataTypes.INTEGER, allowNull: false, references: {
        model: "rols", 
        key: "id"
    }}
}, {tableName: "usuarios"});

module.exports = Usuario;