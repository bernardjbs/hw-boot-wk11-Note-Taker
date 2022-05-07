// Include external modules
const express = require('express');
const path = require('path');

// Create an instance of express router as webRouter
const webRouter = express.Router();

// Setting a get request for the route '/' as root
webRouter.get('/', (req,res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));

// Setting a get request for the route '/notes'
webRouter.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'notes.html'))
});

module.exports = webRouter;