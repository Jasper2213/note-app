import express from 'express';
import cors from 'cors';

import { Note } from './logic/data/mock/mock-repository.js';
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
    res.json(Note.getAllNotes());
});

app.get('/notes/:query', (req, res, next) => {
    const query = req.params.query;

    res.json(Note.getNoteByTitle(query));
});

app.post('/note', (req, res, next) => {
    res.send(Note.create(req.body));
});

app.get('/favourites', (req, res, next) => {
   res.json(Note.getAllFavourites());
});

app.post('/notes/favourites/:id', (req, res, next) => {
   const id = parseInt(req.params.id);
   Note.addToFavourites(id);

    res.json(Note.getAllNotes());
});

app.delete('/notes/favourites/:id', (req, res, next) => {
   const id = parseInt(req.params.id);
   Note.removeFromFavourites(id);

   res.json(Note.getAllNotes());
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
