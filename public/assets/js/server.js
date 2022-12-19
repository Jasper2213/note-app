import express from 'express';
import cors from 'cors';
import basicAuth from 'express-basic-auth';

import { Note } from './logic/data/mock/mock-repository.js';
import {CustomError} from "./logic/exceptions/errorhandling.js";

const users = { admin: 1234 };

const PORT = 3000;
const SERVER_ERROR_STATUSCODE = 500;
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

app.post('/note', (req, res, next) => {
    Note.create(req.body);
    res.status(SUCCESSFUL_ADD).send();
});

app.get('/notes/favourites', (req, res, next) => {
    res.json(Note.getAllFavourites());
});

app.use((err, req, res, next) => {
    if (err instanceof CustomError)
        res.status(err.statusCode).send(err.message);
    else {
        console.error(err);
        res.status(SERVER_ERROR_STATUSCODE).send(SERVER_ERROR_MESSAGE);
    }
});