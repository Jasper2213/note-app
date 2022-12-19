import { notes, favourites } from "./data/mockdata.js";

function getAllNotes() {
    return notes;
}

function getAllFavourites() {
    return favourites;
}

export { getAllNotes, getAllFavourites }