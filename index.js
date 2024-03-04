const express = require("express");
const { Router } = require("express");
const db = require("./infra/database");
const app = express();
const apiRouter = Router();
const porta = process.env.HTTP_PORT || 8080;
const localhost = "0.0.0.0";

app.use(express.json());

app.use("/clientes", apiRouter); // router que permite captura de parâmetros da URL para o endPoint /clientes

apiRouter.post("/:id/transacoes", async (req, res) => {
  console.log("endpoit post");
  res.type("application/json");
  const id = req.params.id;
  let { valor } = req.body;
  const { tipo } = req.body;
  const { descricao } = req.body;

  if (
    !/^\d+$/.test(valor) || // a expressão regular testa se valor é formado por números
    !Number.isInteger(Number(valor)) || // o metodo number transforma valor em um número, caso seja um número em uma string e o método Number.isInterger testa se é o numero inteiro
    Number(valor) < 0
  ) {
    res.status(422).send("operação inválida!");
    return;
  }
  if (
    descricao === undefined ||
    descricao === null ||
    descricao.trim() === ""
  ) {
    res.status(422).send("Descrição faltante");
    return;
  } else if (descricao.length >= 15) {
    res.status(422).send("Descrição muito grande");
    return;
  }
  if (id >= 6) {
    res.status(404).send("Cliente inexistente!");
    return;
  }
  if (tipo === "c") {
    // crédito de valor em conta
    valor = valor;
  } else if (tipo === "d") {
    // débito de valor em conta
    valor = -valor;
    const query0 = await db.query({
      text: "SELECT limite, saldo FROM clientes WHERE id = $1",
      values: [id],
    });
    if (query0.rows[0].saldo + valor < -query0.rows[0].limite) {
      console.log("limite insuficiente");
      res.status(422).send("Limite insuficiente!");
      return;
    }
  } else {
    console.log("operação indefinida!");
    res.status(422).send("operação indefinida!");
    return;
  }
  const query1 = await db.query({
    text: "UPDATE clientes SET saldo = saldo + $1 WHERE id = $2",
    values: [valor, id],
  });
  const query2 = await db.query({
    text: "INSERT INTO transacoes(valor, cliente_id, tipo, descricao) values(ABS($1),$2,$3,$4)",
    values: [valor, id, tipo, descricao],
  });

  const query3 = await db.query({
    // consulta limite e saldo de acordo com o id vindo na url
    text: "SELECT limite, saldo FROM clientes WHERE id = $1",
    values: [id],
  });
  res.status(200).send(query3.rows[0]);
  return;
});

apiRouter.get("/:id/extrato", async (req, res) => {
  const id = req.params.id;
  if (id >= 6) {
    res.status(404).send("Cliente inexistente!");
    return;
  }
  const query1 = await db.query({
    text: "SELECT limite, saldo FROM clientes WHERE id = $1",
    values: [id],
  });
  const query2 = await db.query({
    text: "SELECT valor, tipo, descricao, realizada_em FROM transacoes WHERE cliente_id = $1 ORDER BY realizada_em DESC limit 10",
    values: [id],
  });
  const updatedAt = new Date().toISOString();
  const ultimas_transacoes = [];

  query2.rows.forEach((element) => {
    // recebe os elementos da query2.rows e armazena na array ultimas_transacoes para ser usada como elemento da propriedade ultimas_transacoes
    ultimas_transacoes.push(element);
  });
  const objectResponse = {
    saldo: {
      total: query1.rows[0].saldo,
      data_extrato: updatedAt,
      limite: query1.rows[0].limite,
    },
    ultimas_transacoes: ultimas_transacoes, //recebe a array ultimas_transacoes
  };
  res.type("application/json");
  res.status(200).send(objectResponse);
  return;
});
app.listen(porta, localhost, () => {
  console.log("servidor rodando!");
});
