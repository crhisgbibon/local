const db = require('better-sqlite3')('db/local.db');

exports.index = function (req, res, next)
{
  const rows = db.prepare(`SELECT * FROM 'references'`).all();
  res.render('home/index', {
    header: 'Local',
    title: 'Local',
    references: rows,
  });
};