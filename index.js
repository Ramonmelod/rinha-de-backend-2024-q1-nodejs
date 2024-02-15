const express = require("express");
const { Router } = require("express");
const db = require("./infra/database");
const app = express();
const apiRouter = Router();
const porta = 3000;
const localhost = "localhost";

//app.use(express.json());

app.use("/clientes", apiRouter);
//app.use("/clientes/:id/extrato", apiRouter);

apiRouter.post("/:id/transacoes", (req, res) => {
  const id = req.params.id;
  res.type("text/plain");
  /*   const A = "1";
  const B = "2"; */
  console.log("endpoit post");
  res.send("Seu id via post é: " + id);
});

apiRouter.get("/:id/extrato", (req, res) => {
  res.type("text/plain");
  const id = req.params.id;
  console.log("endpoit get");
  res.send("Seu id via get é: " + id);
});

app.listen(porta, localhost, () => {
  console.log("servidor rodando!");
});
