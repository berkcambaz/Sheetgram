const mysql = require("mysql");
console.log(process.env.DB_USER);
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "",
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database...");
});

module.exports = db;