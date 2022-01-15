const mysql = require("mysql");

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

/**
 * 
 * @param {string} sql 
 * @param {any} values 
 * @returns {Promise<{err: mysql.MysqlError, results: any, fields: mysql.FieldInfo[]}>}
 */
function query(sql, values) {
  return new Promise((resolve) => {
    db.query(sql, values, (err, results, fields) => {
      resolve({ err, results, fields });
    })
  });
}

module.exports = { db, query };