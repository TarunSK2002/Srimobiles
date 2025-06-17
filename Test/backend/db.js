const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456789',
    database: 'image_upload_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected!');
});

module.exports = db;
