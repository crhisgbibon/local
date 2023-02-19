const sqlite3 = require('sqlite3').verbose();
const db = sqlite3.Database('../db/local.db', sqlite3.OPEN_READWRITE, (err) =>
{
  if(err && err.code == "SQLITE_CANTOPEN")
  {
    return;
  }
  else if(err)
  {
    console.log("Getting error " + err);
    exit(1);
  }
  RunQuery(db);
});

function RunQuery(db)
{
  db.all(`
  SELECT * FROM references
  `,
  (err, rows) =>
  {
    console.log("Printing all display names from references table:" + "\t");
    rows.forEach(row =>
    {
      console.log(row.displayName + "\t");
    });
  });
}