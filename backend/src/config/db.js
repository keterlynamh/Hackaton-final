const { Sequelize } = require(`sequelize`);
require(`dotenv`).config();

const sequelize = process.env.DB_URL
?new Sequelize(process.env.DB_URL,{
    dialect:"postgrest",
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
})

: new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT
    }
)

module.exports = sequelize;