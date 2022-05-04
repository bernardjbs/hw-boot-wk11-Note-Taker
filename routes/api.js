const express = require('express');
const path = require('path');
const fs = require('fs');
const notesDataPath = path.join(__dirname, '..', 'db', 'db.json');
const apiRouter = express.Router();
const {v4} = require('uuid');

function getNotesData() {
    return JSON.parse(fs.readFileSync(notesDataPath, 'utf-8'));
}

// Setting a GET request for the route api/notes
apiRouter.get('/api/notes', (req, res) => {
    res.json(getNotesData());
});

// Setting a POST request for the route api/notes
apiRouter.post('/api/notes', (req, res) => {
 
    const noteID = v4();
    const title = req.body.title;
    const text = req.body.text;
    // Build a new note object to be saved
    const note = {
        noteID: noteID, 
        title: title, 
        text: text
    };

    const notesData = getNotesData();
    notesData.push(note);

    fs.writeFileSync(notesDataPath, JSON.stringify(notesData), 'utf-8');
    res.json('Success');
    
});

module.exports = apiRouter;