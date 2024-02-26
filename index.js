const express = require("express");
const { Router } = require("express");
const db = require("./infra/database");
const app = express();
const apiRouter = Router();
const porta = process.env.HTTP_PORT || 8080;
const localhost = "0.0.0.0";

app.use(express.json()); // verificar real necessidade de uso

app.use("/clientes", apiRouter); // router que permite captura de parâmetros da URL para o endPoint /clientes

apiRouter.post("/:id/transacoes", async (req, res) => {
  const id = req.params.id;
  const { saldo } = req.body;
  const query = await db.query({
    // está também é a forma automatizada em que o node-postgres sanitiza a query
    text: "UPDATE clientes SET s_saldo_clientes = $1 WHERE i_id_clientes = $2",
    values: [saldo, id],
  });
  res.type("application/json");
  console.log("endpoit post");
  res.status(200).send("O cliente com: " + id + " teve o saldo atualizado");
});

apiRouter.get("/:id/extrato", async (req, res) => {
  const id = req.params.id;
  const query2 = await db.query("SELECT * FROM clientes;");
  const resultadoConsulta = parseInt(query2);
  res.type("application/json");
  console.log("endpoit get");
  res.status(200).send(query2.rows);
});
app.get("/", async (req, res) => {
  // endpoint apenas para teste de desenvolvimento
  res.type("text/plain");
  console.log("endpoit get");
  res.status(200).send("Get deu certo");
});

app.listen(porta, localhost, () => {
  console.log("servidor rodando!");
});

/*notas:
os serviços não devem demorar mais que 40 segundos para subir estar disponiveis
*/
