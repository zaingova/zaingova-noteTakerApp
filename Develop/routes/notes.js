// variable declaration
const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET route for retrieving note data
notes.get('/', (req, res) => {
  readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)));
})

// POST route for submitting note data
notes.post('/', (req, res) => {
  // constant variables equal to request body
  const { noteTitle, noteText } = req.body;

  // if the request body is not empty
  if (req.body) {
    // create a new note-object with values equal to the variables created above
    const newNote = {
      noteTitle,
      noteText
    };

    // add this object to db.json
    readAndAppend(newNote, './db/db.json');

    // success object containing a status and the note object
    const successResponse = {
      status: 'success',
      body: newNote
    };

    // send JSON response containing status and note-object
    res.json(successResponse);
  } else {
    // send JSON response regarding failed operation
    res.json('ERROR! Could not post note. Please review your input.');
  }
})

// exports notes router
module.exports = notes;
