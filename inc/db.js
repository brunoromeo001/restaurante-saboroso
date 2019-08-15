const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '10.9.3.13',
  user: 'user',
  database: 'saboroso',
  password: 'user102030'
});

module.exports = connection;