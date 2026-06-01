const { Sequelize } = require(`sequelize`);
require(`dotenv`).config();

const sequelize = new Sequelize(process.env.DB_URL,{
  logging: false,
  dialect:process.env.DB_DIALECT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

/*: new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT
      }
    );*/

module.exports = sequelize;