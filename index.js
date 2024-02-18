const express = require("express");
const { Router } = require("express");
const db = require("./infra/database");
const app = express();
const apiRouter = Router();
const porta = 8080;
const localhost = "0.0.0.0";

app.use(express.json()); // verificar real necessidade de uso

app.use("/clientes", apiRouter); // router que permite captura de parâmetros da URL para o endPoint /clientes

apiRouter.post("/:id/transacoes", async (req, res) => {
  const id = req.params.id;
  const query = await db.query();
  res.type("text/plain");
  console.log("endpoit post");
  res.status(200).send("Seu id via post é: " + id + query);
});

apiRouter.get("/:id/extrato", async (req, res) => {
  const id = req.params.id;
  const query2 = await db.query();
  const resultadoConsulta = parseInt(query2);
  res.type("application/json");
  console.log("endpoit get");
  res.status(200).send(query2.rows);
});

app.listen(porta, localhost, () => {
  console.log("servidor rodando!");
});

/*notas:
os serviços não devem demorar mais que 40 segundos para subir estar disponiveis
*/
