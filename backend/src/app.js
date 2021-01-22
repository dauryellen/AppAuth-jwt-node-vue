const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();

// importar o arquivo config.db.js
const database = require("./config/db.config"); // conexão local da base de dados

mongoose.Promise = global.Promise;

// conexão da base de dados
mongoose
  .connect(database.local.localDatabaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    () => {
      console.log("A base de dados foi conectada com sucesso");
    },
    (err) => {
      console.log(`Erro ao conectar com a base de dados...: ${err}`);
      process(exit);
    }
  );

// Rotas da API
const index = require("./routes/index");
// TODO: Declarar rota user.routes.js

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors());
app.use(morgan("dev"));

app.use(index);

module.exports = app;
