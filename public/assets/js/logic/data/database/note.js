import { executeWithResult } from "./data/connection.js";
import { UnexistingResourceError } from "../../exceptions/errorhandling.js";

const GET_ALL_NOTES = "SELECT * FROM `note`";


async function getAllNotes() {

}

async function create(data) {

}

async function getNote(id) {

}

async function getNoteByTitle(title) {

}

async function getAllFavourites() {

}

async function addToFavourites(id) {

}

async function removeFromFavourites(id) {

}

export { getAllNotes, create, getNote, getNoteByTitle, getAllFavourites, addToFavourites, removeFromFavourites };

