const express = require('express');
// const path = require('path');
const notesData = require('../db/db.json');
const apiRouter = express.Router();


apiRouter.get('/api/notes', (req, res) => {
    res.status(200).json(notesData);
});

module.exports = apiRouter;