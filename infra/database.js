const { Client } = require("pg");

const query = async () => {
  const client = new Client({
    host: "localhost",
    port: "5432",
    user: "postgres",
    database: "postgres",
    password: "local_password",
  });

  await client.connect();

  try {
    const res = await client.query("SELECT * FROM clientes;");
    return res;
  } catch (error) {
    console.log("Erro no try-catch em: " + error);
  } finally {
    await client.end();
  }
};

module.exports = { query };
