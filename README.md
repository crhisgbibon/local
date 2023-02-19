# local

test change

# startup
Run server
```
npm run server
```

# load db
Create local.db in db folder
Create tables if missing:
```
node db/migrate.js
```
Scans public folders (documents, images, videos) and loads into db
```
node db/populate.js
```