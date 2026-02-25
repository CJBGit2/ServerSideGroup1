import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "x",
  database: "assignment1db",
});

export default db;