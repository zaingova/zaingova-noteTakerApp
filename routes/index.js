// imports
const express = require('express');
const notesRouter = require('./notes');
const app = express();

// telling express to use the notes router
app.use('/notes', notesRouter);

// module exports
module.exports = app;