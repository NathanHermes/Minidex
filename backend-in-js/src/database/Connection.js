import { createConnection } from "mysql2/promise";
import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();
(async () => {
  await createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  })
    .then((connection) => {
      connection
        .query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DB};`)
        .then(() => {
          console.log(
            `\u001b[36mMySQL: ${process.env.MYSQL_DB} database was success created.\u001b[37m`
          );
        })
        .catch((error) => console.log(`\u001b[31m${error}.\u001b[37m`));
    })
    .catch((error) => console.log(`\u001b[31m${error}.\u001b[37m`));
})();

export const connection = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
    logging: false,
  }
);
