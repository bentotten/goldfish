//https://www.sqlitetutorial.net/sqlite-nodejs/connect/
const sqlite3 = require('sqlite3').verbose();

const name = './db/goldfish.db'
//const name = ':memory:'  // For future memory use

/*
"_id": "1",
"_binId": "2",
"name": "amet cillum sunt",
"quad": 2,
"prio": 22,
"due": "2015-02-12T09:32:19 +08:00",
"location": "730 Pierrepont Street, Temperanceville, Guam, 3846",
"comment": "Lorem elit non dolor fugiat eu non laborum do duis",
"complete": false
*/

// Database function to use elsewhere
async function database() {

    const sql = `SELECT DISTINCT _id _id FROM playlists ORDER BY name`;

    const db = new sqlite3.Database(name, sqlite3.OPEN_CREATE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });

    db.all(sql, params, (err, rows) => {
            //Interact with db here
    });

    // Close db
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });

}

database();