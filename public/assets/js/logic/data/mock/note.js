import { notes, favourites } from "./data/mockdata";
import { UnexistingResourceError } from "../../exceptions/errorhandling";

function getAllNotes() {
    if (!notes)
        throw new UnexistingResourceError("Cannot find the notes");

    return notes;
}

function getAllFavourites() {
    if (!favourites)
        throw new UnexistingResourceError("Cannot find the favourites");

    return favourites;
}

export { getAllNotes, getAllFavourites }