const express = require("express");
const { Router } = require("express");
const db = require("./infra/database");
const app = express();
const apiRouter = Router();
const porta = process.env.HTTP_PORT || 8080;
const localhost = "0.0.0.0";

app.use(express.json()); // verificar real necessidade de uso

app.use("/clientes", apiRouter); // router que permite captura de parâmetros da URL para o endPoint /clientes
//--------------------------------post ------------------------------------------------------------
apiRouter.post("/:id/transacoes", async (req, res) => {
  console.log("endpoit post");
  res.type("application/json");
  const id = req.params.id;
  let { valor } = req.body;
  const { tipo } = req.body;
  const { descricao } = req.body;
  if (tipo === "c") {
    // implementar controle de limite de saldo
    // crédito de valor em conta
    valor = valor;
  } else if (tipo === "d") {
    // débito de valor em conta
    valor = -valor;
  } else {
    res.status(422).send("operação não existente para tipo =  " + tipo);
  }
  const query1 = await db.query({
    text: "UPDATE clientes SET saldo = saldo + $1 WHERE id = $2",
    values: [valor, id],
  });
  const query2 = await db.query({
    text: "INSERT INTO transacoes(i_valor_transacoes, cliente_id, s_tipo_transacoes, s_descricao_transacoes) values($1,$2,$3,$4)",
    values: [valor, id, tipo, descricao],
  });

  const query3 = await db.query({
    // consulta limite e saldo de acordo com o id vindo na url
    text: "SELECT limite, saldo FROM clientes WHERE id = $1",
    values: [id],
  });
  const resultadoConsulta = parseInt(query3); // verificar necessidade do parse
  res.status(200).send(query3.rows);
});

apiRouter.get("/:id/extrato", async (req, res) => {
  const id = req.params.id;
  const query2 = await db.query({
    text: "SELECT c.limite, c.saldo, t.i_realizada_transacoes FROM clientes c JOIN transacoes t ON c.id = t.cliente_id WHERE c.id = $1;",
    values: [id],
  });
  //const resultadoConsulta = parseInt(query2);
  res.type("application/json");
  console.log("endpoit get");
  res.status(200).send(query2.rows);
});
/*app.get("/", async (req, res) => {
  // endpoint apenas para teste de desenvolvimento
  res.type("text/plain");
  console.log("endpoit get");
  res.status(200).send("Get deu certo");
});// apenas para teste da api sem conexão com o bando de dados*/

app.listen(porta, localhost, () => {
  console.log("servidor rodando!");
});

/*notas:
os serviços não devem demorar mais que 40 segundos para subir estar disponiveis
*/
