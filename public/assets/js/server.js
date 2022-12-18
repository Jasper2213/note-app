import express from 'express';
import cors from 'cors';
import basicAuth from 'express-basic-auth';

import { Note } from './logic/data/mock/mock-repository.js';

const users = { admin: 1234 };

const PORT = 3000;
const SERVER_ERROR_STATUSCODE = 500;
const SERVER_ERROR_MESSAGE = "Server error";

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

app.get('/notes/favourites', (req, res, next) => {
    Note.getAllFavourites()
        .then(results => res.json(results))
        .catch(err => next(err));
});

app.use((err, req, res, next) => {
    if (err instanceof CustomError)
        res.status(err.statusCode).send(err.message);
    else {
        console.error(err);
        res.status(SERVER_ERROR_STATUSCODE).send(SERVER_ERROR_MESSAGE);
    }
});