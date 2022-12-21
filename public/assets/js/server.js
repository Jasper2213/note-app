import express from 'express';
import cors from 'cors';

import { Note } from './logic/data/database/database-repository.js';
import {CustomError} from "./logic/exceptions/errorhandling.js";

const PORT = 3000;
const SERVER_ERROR_STATUS_CODE = 500;
const SERVER_ERROR_MESSAGE = "Server error";
const SUCCESSFUL_ADD = 201;

const app = express();

app.use(cors());
app.use("/", express.static('public'));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`NotesDB is listening on port ${PORT}`);
});

app.get('/notes', (req, res, next) => {
    Note.getAllNotes()
        .then(results => res.json(results))
        .catch(err => next(err));
});

app.get('/notes/:query', (req, res, next) => {
    const query = req.params.query;

    Note.getNoteByTitle(query)
        .then(results => res.json(results))
        .catch(err => next(err));
});

app.post('/note', (req, res, next) => {
    Note.create(req.body)
        .then(results => res.json(results))
        .catch(err => next(err));
});

app.get('/note/:id', (req, res, next) => {
    const id = parseInt(req.params.id);

    Note.getNote(id)
        .then(results => res.json(results))
        .catch(err => next(err));
});

app.get('/favourites', (req, res, next) => {
   Note.getAllFavourites()
       .then(results => res.json(results))
       .catch(err => next(err));
});

app.post('/notes/favourites/:id', (req, res, next) => {
   const id = parseInt(req.params.id);
   Note.addToFavourites(id)
       .catch(err => next(err));

    res.json(Note.getAllFavourites());
});

app.delete('/notes/favourites/:id', (req, res, next) => {
   const id = parseInt(req.params.id);
   Note.removeFromFavourites(id)
       .catch(err => next(err));

   res.json(Note.getAllFavourites());
});

app.use((err, req, res, next) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).send(err.message);
    }
    else {
        console.error(err);
        res.status(SERVER_ERROR_STATUS_CODE).send(SERVER_ERROR_MESSAGE);
    }
});
