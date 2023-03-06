const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const glob = require('glob');

glob('public/images/*', function(err, files) {
  if (err) throw err;
  let fileNames = files.map(file => path.basename(file));
  let len = fileNames.length;
  for(let i = 0; i < len; i++)
  {
    const name = fileNames[i];
    const db = new sqlite3.Database('db/local.db');
    console.log('inserting row: ' + name);
    const stmt = db.prepare(`
      INSERT OR IGNORE INTO 'references' (fileLocation, fileType, displayName, tags)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(name, 'image', name, '["image"]');
    console.log("changes are " + info.changes); // => 1
    db.close();
  }
});