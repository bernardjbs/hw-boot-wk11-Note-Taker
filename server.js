// Include external modules
const express = require('express');
const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');

// Creating app as an instance of express
const app = express();
// Set the port to 3001
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(apiRouter);
app.use(webRouter);


// Use the port 3001 to connect the app to the server
app.listen(PORT, () => 
    console.log(`Serving static asset routes on http://localhost:${PORT} on port ${PORT}!`)
);