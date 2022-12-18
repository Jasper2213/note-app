"use strict";

const BASEURL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    document.querySelector("#input_search").addEventListener("focus", () => {
        document.querySelector("label").classList.add("active");
    });

    document.querySelector("#input_search").addEventListener("blur", () => {
        document.querySelector("label").classList.remove("active");
    });

    document.querySelector("#new").addEventListener("click", createNewNote);

    document.querySelector("dialog #cancel").addEventListener("click", closeDialogWithoutClearingText);

    await addNotes();
}

function createNewNote() {
    const $dialog = document.querySelector("dialog#new-note");
    $dialog.showModal();
}

function closeDialogWithoutClearingText() {
    const $dialog = document.querySelector("dialog#new-note");
    $dialog.close();
}

async function addNotes() {
    const $notesDiv = document.querySelector("#cards");

    const notes = await fetch(`${BASEURL}/notes`).then(res => res.json());
    notes.forEach(note => {
        // TODO: Use templates?
        const card = `<div class="card">
                          <h2>${note.title}</h2>
                          <p>${note.content}</p>
                          <p class="date">${note.date.getDay()}/${note.date.getMonth()}/${note.date.getFullYear()}</p>
                      </div>`;

        $notesDiv.insertAdjacentHTML("beforeend", card);
    })
}