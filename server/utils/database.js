const mysql = require("mysql2");

let connection = mysql.createConnection({
  host: "localhost",
  //   port: "3306",
  user: "root",
  password: "12345678",
  database: "module3_hack",
});

connection.connect((err) => {
  if (err) {
    console.log("Kết nối thất bại", err);
  } else {
    console.log("Kết nối thành công");
  }
});

module.exports = connection;
