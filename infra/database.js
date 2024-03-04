const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  //max: 80,
});

const query = async (queryObject) => {
  const client = await pool.connect(); // verificar se let é válido

  try {
    const res = await client.query(queryObject); //client.query
    return res;
  } catch (error) {
    console.log("Erro no try-catch em: " + error);
  } finally {
    if (client) {
      client.release();
    }
  }
};

module.exports = { query };
