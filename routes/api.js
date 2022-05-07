// Include external modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const apiRouter = express.Router();
let notesData = require('../db/db.json');
const {v4} = require('uuid');

const notesDataPath = path.join(__dirname, '..', 'db', 'db.json');

// Function to get parsed json data from file
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
    let newNotes = getNotesData()
    const foundNote = newNotes.find(newNotes => newNotes.id === id);
    if(foundNote) {
        newNotes = newNotes.filter(newNotes => newNotes.id !== id);
        console.log('notes data: ' + JSON.stringify(newNotes));
        fs.writeFileSync(notesDataPath, JSON.stringify(newNotes), 'utf-8');
        res.status(200).json(id);
    }
    else {
        res.status(404).json({ message: 'The Note cannot be deleted, The ID is not found'} );
    }
});

module.exports = apiRouter;