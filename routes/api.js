const express = require('express');
const path = require('path');
const fs = require('fs');
const notesDataPath = path.join(__dirname, '..', 'db', 'db.json');
let notesData = require('../db/db.json');
const apiRouter = express.Router();
const {v4} = require('uuid');

function getNotesData() {
    return JSON.parse(fs.readFileSync(notesDataPath, 'utf-8'));
}

// Setting a GET request route for api/notes
apiRouter.get('/api/notes', (req, res) => {
    res.status(200).json(getNotesData());
});

// Setting a POST request for the route api/notes
apiRouter.post('/api/notes', (req, res) => {
 
    const id = v4();
    const title = req.body.title;
    const text = req.body.text;
    // Build a new note object to be saved
    const note = {
        id: id, 
        title: title, 
        text: text
    };

    const notesData = getNotesData();
    notesData.push(note);

    fs.writeFileSync(notesDataPath, JSON.stringify(notesData), 'utf-8');
    res.json('Success');
    
});

// Setting a Delete request for the route api/notes
apiRouter.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const foundNote = notesData.find(notesData => notesData.id === id);
  
    if(foundNote) {
        notesData = notesData.filter(notesData => notesData.id !== id);
        console.log(notesData);
        fs.writeFileSync(notesDataPath, JSON.stringify(notesData), 'utf-8');
        res.status(200).json(id);
    }
    else {
        res.status(404).json({ message: 'The Note cannot be deleted, The ID is not found'} );
    }
});

module.exports = apiRouter;