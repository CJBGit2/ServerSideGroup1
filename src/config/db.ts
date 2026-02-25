import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sqlcb2!12345",
  database: "assignment1db",
});

export default db;