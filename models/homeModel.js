const db = require('better-sqlite3')('db/local.db');

exports.GetAllReferences = function ()
{
  return rows = db.prepare(`SELECT * FROM 'references'`).all();
};