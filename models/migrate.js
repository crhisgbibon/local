const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('db/local.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS 'references' (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fileLocation VARCHAR(1000) UNIQUE,
      fileType VARCHAR(1000),
      displayName VARCHAR(1000),
      tags VARCHAR(3000)
    );
  `);
});