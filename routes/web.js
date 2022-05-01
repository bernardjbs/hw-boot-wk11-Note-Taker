const express = require('express');
const path = require('path');
const webRouter = express.Router();

webRouter.get('/', (req,res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));

webRouter.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'notes.html'))
});

// webRouter.get('*', (req,res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));

module.exports = webRouter;