//https://www.sqlitetutorial.net/sqlite-nodejs/connect/
const sqlite3 = require('sqlite3').verbose();

// Create new db
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });



  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });