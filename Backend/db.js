// // === db.js ===
// const mysql = require('mysql2');
// const db = mysql.createPool({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '123456789',
//     database: 'nuts_ecommerce'
// });

// // Check DB connection
// const testConnection = () => {
//     db.getConnection((err, connection) => {
//         if (err) {
//             console.error('Database connection failed:', err);
//         } else {
//             console.log('Database connected successfully.');
//             connection.release();
//         }
//     });
// };

// testConnection();

// module.exports = db;



// === db.js ===
const mysql = require('mysql2/promise'); // use promise version

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456789',
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
