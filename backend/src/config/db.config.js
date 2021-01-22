/**
 * description: arquivo responsável por fazer a conexão com a base de dados: MongoDb
 */

const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  local: {
    localDatabaseUrl: process.env.DB_URI,
    secret: "password",
  },
};
