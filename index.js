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
  const { valor } = req.body;
  const { tipo } = req.body;
  const { descricao } = req.body;
  if (tipo === "c") {
    // crédito de valor em conta
    const query1 = await db.query({
      text: "UPDATE clientes SET s_saldo_clientes = s_saldo_clientes + $1 WHERE i_id_clientes = $2",
      values: [valor, id],
    });
    const query2 = await db.query({
      text: "INSERT INTO transacoes(i_valor_transacoes, s_tipo_transacoes, s_descricao_transacoes) values($1,$2,$3)",
      values: [valor, tipo, descricao],
    });
    res
      .status(200)
      .send("O cliente com: " + id + " teve o saldo adicionado em: " + valor);
  } else if (tipo === "d") {
    // débito de valor em conta
    const query1 = await db.query({
      text: "UPDATE clientes SET s_saldo_clientes = s_saldo_clientes - $1 WHERE i_id_clientes = $2",
      values: [valor, id],
    });
    const query2 = await db.query({
      text: "INSERT INTO transacoes(i_valor_transacoes, s_tipo_transacoes, s_descricao_transacoes) values($1,$2,$3)",
      values: [valor, tipo, descricao],
    });
    res
      .status(200)
      .send("O cliente com: " + id + " teve o saldo subtraído em: " + valor);
  } else {
    res.status(422).send("operação não existente para tipo =  " + tipo);
  }
});
/*
else if(valor == "d"){subtração} else{operação invalida}
implementar respostas para erros de requisição:
UPDATE clientes SET s_saldo_clientes = s_saldo_clientes + 100 WHERE i_id_clientes = 1;

*/
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
