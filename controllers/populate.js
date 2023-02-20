const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('local.db');
const glob = require('glob');

glob('public/images/*', function(err, files) {
  if (err) throw err;
  let fileNames = files.map(file => path.basename(file));
  console.log(fileNames);
  PopulateImages(fileNames);
});

glob('public/videos/*', function(err, files) {
  if (err) throw err;
  let fileNames = files.map(file => path.basename(file));
  console.log(fileNames);
  PopulateVideos(fileNames);
});

function PopulateImages(data)
{
  const insertQuery = db.prepare('INSERT INTO `references` (fileLocation, fileType, displayName, tags) VALUES (?, ?, ?, ?)');

  db.serialize(() =>
  {
    let len = data.length;
    
    for(let i = 0; i < len; i++)
    {
      const name = data[i];
      console.log('CREATING RECORD FOR ' + name);
      insertQuery.run(name, 'image', name, '[ "image" ]');
    }

    insertQuery.finalize();
  });
};

function PopulateVideos(data)
{
  const insertQuery = db.prepare('INSERT INTO `references` (fileLocation, fileType, displayName, tags) VALUES (?, ?, ?, ?)');

  db.serialize(() =>
  {
    let len = data.length;
    
    for(let i = 0; i < len; i++)
    {
      const name = data[i];
      console.log('CREATING RECORD FOR ' + name);
      insertQuery.run(name, 'video', name, '[ "video" ]');
    }

    insertQuery.finalize();
  });
};