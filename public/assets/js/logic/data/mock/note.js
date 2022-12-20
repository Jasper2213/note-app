import { notes, favourites } from "./data/mockdata.js";
import {BodyParsingError} from "../../exceptions/errorhandling.js";

function getAllNotes() {
    return notes;
}

function create(data) {
    if (data === undefined) {
        throw new BodyParsingError("Body cannot be empty");
    }

    const { title, content, date } = data;

    if (title === undefined) {
        throw new BodyParsingError("Body must contain a title");
    }

    notes.push({
        id: notes.length + 1,
        title: title,
        content: content,
        date: date
    });

    return notes;
}

function getNote(id) {
    return notes.filter(note => note.id === id);
}

function getNoteByTitle(title) {
    return notes.filter(note => note.title.toLowerCase().includes(title.toLowerCase()));
}

function getAllFavourites() {
    return favourites;
}

function addToFavourites(id) {
    if (!favourites.includes(id)) {
        favourites.push(id);
    }
}

function removeFromFavourites(id) {
    if (favourites.includes(id)) {
        favourites.splice(favourites.indexOf(id), 1);
    }
}

export { getAllNotes, create, getNote, getNoteByTitle, getAllFavourites, addToFavourites, removeFromFavourites };
