const express = require('express');
const data = require('./db/db.json');
const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');

const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(apiRouter);
app.use(webRouter);



app.listen(PORT, () => 
    console.log(`Serving static asset routes on http://localhost:${PORT} on port ${PORT}!`)
);