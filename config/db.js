const mysql = require('mysql');
const { database } = require('./credentials');

const db = (query) => {
  const connection = mysql.createConnection({
    host: database.hostname,
    user: database.username,
    password: database.password,
    database: database.name
  });

  try {
    return new Promise((resolve, reject) => {
      connection.connect((err) => {
        console.log('c');
        if (!err) {
          console.log(err);
          reject(err);
        }
      });

      return connection.query(query, (error, results) => {
        console.log(error);
        console.log('d');
        console.log(results);

        if (!error) {
          console.log('z');
          resolve(results);
        }
      });
    });
  } finally {
    connection.end();
  }
};

module.exports = db;
