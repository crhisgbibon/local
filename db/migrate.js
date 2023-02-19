const sqlite3 = require('sqlite3').verbose();
sqlite3.Database('/local.db', sqlite3.OPEN_READWRITE, (err) =>
{
  if(err && err.code == "SQLITE_CANTOPEN")
  {
    CreateDatabase();
    return;
  }
  else if(err)
  {
    console.log("Getting error " + err);
    exit(1);
  }
});

function CreateDatabase() {
  let newdb = new sqlite3.Database('/local.db', (err) =>
  {
    if(err)
    {
      console.log("Getting error " + err);
      exit(1);
    }
    CreateTables(newdb);
  });
}

function CreateTables(newdb)
{
  newdb.exec(`
  CREATE TABLE references (
    id INT PRIMARY KEY NOT NULL,
    fileLocation VARCHAR(1000),
    fileType VARCHAR(1000),
    displayName VARCHAR(1000),
    tags VARCHAR(1000)
  );

  CREATE TABLE playlists (
    id INT PRIMARY KEY NOT NULL,
    reference_ids VARCHAR(1000),
    tags VARCHAR(1000),
    hidden BOOLEAN(1)
  );
  `, ()  =>
  {
    console.log("Tables created.");
  });
}