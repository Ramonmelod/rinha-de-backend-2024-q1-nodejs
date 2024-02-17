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

  const res = await client.query("show server_version;");
  console.log(res.rows[0].message); // Hello world!
  await client.end();
};

// implementar try-catch

module.exports = { query };
