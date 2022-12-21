import { UnexistingResourceError } from "../../exceptions/errorhandling.js";
import {executeWithoutResult, executeWithResult} from "./data/connection.js";

const GET_ALL_NOTES = "SELECT * FROM `note`";
const GET_NOTE_BY_ID = "SELECT * FROM note WHERE id = ?";
const GET_NOTE_BY_TITLE = "SELECT * FROM note WHERE title = ?";
const GET_FAVOURITES = "SELECT * FROM favourite";

const CREATE_NOTE = "INSERT INTO note (title, content, date) VALUES (?, ?, ?)";
const ADD_TO_FAVOURITES = "INSERT INTO favourite VALUES (?)";

const REMOVE_FROM_FAVOURITES = "DELETE FROM favourite WHERE id = ?"

async function getAllNotes() {
    return await executeWithResult(GET_ALL_NOTES);
}

async function create(data) {
    await executeWithoutResult(
        CREATE_NOTE,
        data.title,
        data.content,
        data.date.split("T")[0]
    );

    return await getAllNotes();
}

async function getNote(id) {
    await executeWithoutResult(GET_NOTE_BY_ID, id);

    return await getAllNotes();
}

async function getNoteByTitle(title) {
    await executeWithoutResult(GET_NOTE_BY_TITLE, title);

    return await getAllNotes();
}

async function getAllFavourites() {
    return await executeWithResult(GET_FAVOURITES);
}

async function addToFavourites(id) {
    await executeWithoutResult(ADD_TO_FAVOURITES, id);


    return await getAllFavourites();
}

async function removeFromFavourites(id) {
    await executeWithoutResult(REMOVE_FROM_FAVOURITES, id);

    return await getAllFavourites();
}

export { getAllNotes, create, getNote, getNoteByTitle, getAllFavourites, addToFavourites, removeFromFavourites };

