"use strict";

/* TODO's:
      [] Add event listeners to new forms
      [] Add sorting possibilities to notes when retrieving them (Add new endpoint for this?)
      [] Add possibility to favourite a note
      [] Add more mock-data
      [] Add possibility to edit a note
*/

document.addEventListener("DOMContentLoaded", init);

async function init() {
    document.querySelector("#input_search").addEventListener("focus", () => {
        document.querySelector("label.search").classList.add("active");
    });

    document.querySelector("#input_search").addEventListener("blur", () => {
        document.querySelector("label.search").classList.remove("active");
    });

    document.querySelector("#new").addEventListener("click", createNewNote);
    document.querySelector("#new-note form").addEventListener("submit", addNote);
    document.querySelector("dialog #cancel").addEventListener("click", closeDialog);

    document.querySelector("#listView").addEventListener("click", showNotesInListView);
    document.querySelector("#cardView").addEventListener("click", showNotesInCardView);

    await showNotes();
}

async function showNotes() {
    if (document.querySelector("#listView").classList.contains("selected"))
        await showNotesInListView();

    else await showNotesInCardView();
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

function addNote(e) {
    e.preventDefault();

    const $title = document.querySelector("input#title");
    const $content = document.querySelector("textarea#text");

    const noteTitle = $title.value;
    const noteContent = $content.value;


    const body = {
        title: noteTitle,
        content: noteContent,
        date: new Date()
    };

    post('/note', body)
        .then(() => showNotes())
        .catch(err => console.error(err));

    $title.value = "";
    $content.value = "";

    closeDialog();
}

function closeDialog() {
    const $dialog = document.querySelector("dialog#new-note");
    $dialog.close();
}

async function addNotesInListView() {
    const $notesDiv = document.querySelector("#cards");
    $notesDiv.innerHTML =  `<div id=notesList></div>
                            <div id=fullNote></div>`;

    const $notesListDiv = document.querySelector("#notesList");

    const notes = await get(`/notes`).then(res => res.json());
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

    const notes = await get(`/notes`).then(res => res.json());
    notes.forEach(note => {
        const card = `<div class="card">
                          <h2>${note.title}</h2>
                          <p>${note.content}</p>
                          <p class="date">${note.date.split("T")[0]}</p>
                      </div>`;

        $notesDiv.insertAdjacentHTML("beforeend", card);
    });
}
