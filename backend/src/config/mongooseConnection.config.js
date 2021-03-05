/**
 * arquivo responsável por fazer a conexão com banco de dados
 */

const express = require("express");
const mongoose = require("mongoose");

const database = require("./db.config"); // conexão local da base de dados

mongoose.Promise = global.Promise;

// conexão da base de dados
mongoose
  .connect(database.local.localDatabaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // eslint-disable-next-line comma-dangle
    useCreateIndex: true,
  })
  .then(
    () => {
      console.log("A base de dados foi conectada com sucesso");
    },
    (err) => {
      console.log(`Erro ao conectar com a base de dados...: ${err}`);
      // eslint-disable-next-line no-undef
      process(exit);
    }
  );
