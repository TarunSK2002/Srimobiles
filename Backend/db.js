const mysql = require('mysql2/promise'); 
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Password',
    database: 'Sri_mobiles'
});
db.getConnection()
  .then(connection => {
    console.log("Database connected successfully");
    connection.release();
  })
  .catch(err => {
    console.error("Database connection failed:", err);
  });

module.exports = db;
