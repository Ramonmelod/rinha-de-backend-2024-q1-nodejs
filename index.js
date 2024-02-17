const express = require("express");
const { Router } = require("express");
const db = require("./infra/database");
const app = express();
const apiRouter = Router();
const porta = 8080;
const localhost = "0.0.0.0";

//app.use(express.json());

app.use("/clientes", apiRouter); // router que permite captura de parâmetros da URL para o endPoint /clientes

apiRouter.post("/:id/transacoes", (req, res) => {
  const id = req.params.id;
  res.type("text/plain");
  console.log("endpoit post");
  res.status(200).send("Seu id via post é: " + id);
});

apiRouter.get("/:id/extrato", (req, res) => {
  res.type("text/plain");
  const id = req.params.id;
  console.log("endpoit get");
  res.status(200).send("Seu id via get é: " + id);
});

app.listen(porta, localhost, () => {
  console.log("servidor rodando!");
});

/*notas:
os serviços não devem demorar mais que 40 segundos para subir estar disponiveis
*/
