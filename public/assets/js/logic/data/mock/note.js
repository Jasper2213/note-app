import { notes, favourites } from "./data/mockdata.js";
import {BodyParsingError} from "../../exceptions/errorhandling.js";

function getAllNotes() {
    return notes;
}

function getAllFavourites() {
    return favourites;
}

function create(data) {
    if (data === undefined)
        throw new BodyParsingError("Body cannot be empty");

    const { title, content, date } = data;

    if (title === undefined)
        throw new BodyParsingError("Body must contain a title");

    notes.push({
        id: notes.length + 1,
        title: title,
        content: content,
        date: date
    });
}

function getNoteByTitle(title) {
    return notes.filter(note => note.title.toLowerCase().includes(title.toLowerCase()));
}

export { getAllNotes, getAllFavourites, create, getNoteByTitle }
