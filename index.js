const express = require("express");
const { Router } = require("express");
const db = require("./infra/database");
const porta = 3000;
const localhost = "localhost";

const app = express();

app.post("/post", (req, res) => {
  res.type("text/plain");
  console.log("endpoit post");
  res.send("Pagina post");
});

app.get("/", (req, res) => {
  res.type("text/plain");
  console.log("endpoit get");
  res.send("Pagina get");
});

app.listen(porta, localhost, () => {
  console.log("servidor rodando!");
});
