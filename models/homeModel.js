const db = require('better-sqlite3')('db/local.db');

exports.GetAllReferences = function ()
{
  let rows = db.prepare(`SELECT * FROM 'references' ORDER BY displayName ASC`).all();
  let len = rows.length;
  for(let i = 0; i < len; i++)
  {
    rows[i].tags = JSON.parse(rows[i].tags);
  }
  return rows;
};

exports.GetAllUniqueTags = function ()
{
  let rows = db.prepare(`SELECT (tags) FROM 'references'`).all();
  let len = rows.length;
  let tags = [];
  for(let i = 0; i < len; i++)
  {
    let t = JSON.parse(rows[i].tags);
    let tLen = t.length;
    for(p = 0; p < tLen; p++)
    {
      if(!tags.includes(t[p].trim())) tags.push(t[p].trim());
    }
  }
  tags.sort();
  return tags;
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

exports.UpdateReferenceTags = function (data)
{
  let len = data.length;
  for(let i = 0; i < len; i++)
  {
    let id = data[i][0];
    let newTags = data[i][1];
    console.log("changing row " + id + " tags to " + newTags);
    const stmt = db.prepare(`
      UPDATE 'references' 
      SET tags = ?
      WHERE id = ?;
    `);
    const info = stmt.run(newTags, id);
    console.log("changes are " + info.changes); // => 1
  }
};