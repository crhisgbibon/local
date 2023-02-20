# local

# startup
Run local server on port 3000:

```
npm run server
```

# load db
Create db/tables if missing:

```
node models/migrate.js
```

Scans public folders (documents, images, videos) and loads into db

```
node models/populate.js
```