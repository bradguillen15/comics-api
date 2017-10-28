const mysql = require('mysql');
const { database } = require('./credentials');

const connection = mysql.createConnection({
  host: database.hostname,
  user: database.username,
  password: database.password,
  port: database.port
});

connection.connect((err) => {
  if (err) {
    console.error(`Database connection failed: ${err.stack}`);
    return;
  }

  console.log('Connected to database.');
});

connection.end();

module.exports = connection;
