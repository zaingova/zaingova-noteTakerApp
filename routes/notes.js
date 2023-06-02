// variable declaration
const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET route for retrieving note data
notes.get('/', (req, res) => {
  readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)));
})

// POST route for submitting note data
notes.post('/', (req, res) => {
  // constant variables equal to request body
  const { title, text } = req.body;

  // if the request body is not empty
  if (req.body) {
    // create a new note-object with values equal to the variables created above
    const newNote = {
      title,
      text,
      id: uuid()
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

notes.delete('/:id', (req, res) => {
  const id = req.params.id;
  let notes = require('../db/db.json');

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id == id) {
      notes.splice(i, 1);
    }
  }

  writeToFile('./db/db.json', notes);
  res.json(notes);

  console.log(req.params.id);
})

// exports notes router
module.exports = notes;
