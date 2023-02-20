const db = require('better-sqlite3')('db/local.db');

exports.GetAllReferences = function ()
{
  let rows = db.prepare(`SELECT * FROM 'references'`).all();
  let len = rows.length;
  for(let i = 0; i < len; i++)
  {
    rows[i].tags = JSON.parse(rows[i].tags);
  }
  return rows;
};

exports.UpdateReferenceName = function (id, newName)
{
  console.log("changing row " + id + " name to " + newName);
  const stmt = db.prepare(`
    UPDATE 'references' 
    SET displayName = ?
    WHERE id = ?;
  `);
  const info = stmt.run(newName, id);

  console.log("changes are " + info.changes); // => 1
};

exports.UpdateReferenceTags = function (id, newTags)
{
  console.log("changing row " + id + " tags to " + newTags);
  const stmt = db.prepare(`
    UPDATE 'references' 
    SET tags = ?
    WHERE id = ?;
  `);
  const info = stmt.run(newTags, id);

  console.log("changes are " + info.changes); // => 1
};