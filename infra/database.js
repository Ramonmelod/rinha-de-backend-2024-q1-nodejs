const { Client } = require("pg");

const query = async (queryObject) => {
  // alterar para um pool de conexões
  const client = new Client({
    host: "localhost",
    port: "5432",
    user: "postgres",
    database: "postgres",
    password: "local_password",
  });

  await client.connect();

  try {
    const res = await client.query(queryObject);
    return res;
  } catch (error) {
    console.log("Erro no try-catch em: " + error);
  } finally {
    await client.end();
  }
};

module.exports = { query };
