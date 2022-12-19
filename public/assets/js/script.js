"use strict";

/* TODO's:
      [] Add event listeners to new forms
      [] Add sorting possibilities to notes when retrieving them (Add new endpoint for this?)
      [] Add layout for list view
      [] Add possibility to favourite a note
      [] Add more mock-data
*/

const BASEURL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    // TODO: Fix search bar being a bitch
    document.querySelector("#input_search").addEventListener("focus", () => {
        document.querySelector("label").classList.add("active");
    });

    document.querySelector("#input_search").addEventListener("blur", () => {
        document.querySelector("label").classList.remove("active");
    });

    document.querySelector("#new").addEventListener("click", createNewNote);

    document.querySelector("dialog #cancel").addEventListener("click", closeDialogWithoutClearingText);

    document.querySelector("#listView").addEventListener("click", showNotesInListView);
    document.querySelector("#cardView").addEventListener("click", showNotesInCardView);

    await addNotesInCardView();
}

async function showNotesInListView() {
    document.querySelector("#listView").classList.add("selected");
    document.querySelector("#cardView").classList.remove("selected");

    const $notesDiv = document.querySelector("#cards");

    $notesDiv.classList.remove("cardView");
    $notesDiv.classList.add("listView");
    $notesDiv.innerHTML = "";

    await addNotesInListView();
}

async function showNotesInCardView() {
    document.querySelector("#cardView").classList.add("selected");
    document.querySelector("#listView").classList.remove("selected");

    const $notesDiv = document.querySelector("#cards");

    $notesDiv.classList.add("cardView");
    $notesDiv.classList.remove("listView");
    $notesDiv.innerHTML = "";

    await addNotesInCardView();
}

function createNewNote() {
    const $dialog = document.querySelector("dialog#new-note");
    $dialog.showModal();
}

function closeDialogWithoutClearingText() {
    const $dialog = document.querySelector("dialog#new-note");
    $dialog.close();
}

async function addNotesInListView() {
    const $notesDiv = document.querySelector("#cards");
    $notesDiv.innerHTML =  `<div id=notesList></div>
                            <div id=fullNote></div>`;

    const $notesListDiv = document.querySelector("#notesList");

    const notes = await fetch(`${BASEURL}/notes`).then(res => res.json());
    notes.forEach(note => {
        const html = `<div class="note">
                         <h2>${note.title}</h2>
                         <p>${note.content}</p>
                         <p class="date">${note.date.toString().split("T")[0]}</p>
                      </div>`;

        $notesListDiv.insertAdjacentHTML("beforeend", html);
    });

    addEventListenersToNotes();
}

function addEventListenersToNotes() {
    document.querySelectorAll("#notesList .note").forEach(note => {
        note.addEventListener("click", showNote);
    });
}

function showNote(e) {
    const $fullNoteDiv = document.querySelector("#fullNote");

    const note = e.target.closest(".note");
    const title = note.children[0].innerText;
    const content = note.children[1].innerText;
    const date = note.children[2].innerText;

    $fullNoteDiv.innerHTML = `<h2>${title}</h2>
                              <p>${content}</p>
                              <p class="date">${date}</p>`;
}

async function addNotesInCardView() {
    const $notesDiv = document.querySelector("#cards");

    const notes = await fetch(`${BASEURL}/notes`).then(res => res.json());
    notes.forEach(note => {
        const card = `<div class="card">
                          <h2>${note.title}</h2>
                          <p>${note.content}</p>
                          <p class="date">${note.date.split("T")[0]}</p>
                      </div>`;

        $notesDiv.insertAdjacentHTML("beforeend", card);
    });
}
