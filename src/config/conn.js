import mysql from "mysql2";

const conn = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "rooot",
  password: "Sen@iDev77!.",
  database: "desapega",
  port: 3306,
});

conn.query("Select 1 + 1 AS solution", (err, result, fields) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("The solution is: ", result[0].solution);
});

export default conn;
