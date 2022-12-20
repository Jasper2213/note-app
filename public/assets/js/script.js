"use strict";

// TODO:
//  Change order
//  add favourites and filter on favourites (add boolean favourite to json object, and set/filter on that?)
//  edit notes
//  implement database system with docker
//  write readme file with instructions to run locally

document.addEventListener("DOMContentLoaded", init);

async function init() {
    const $inputSearch = document.querySelector("#input_search");
    $inputSearch.addEventListener("focus", () => {
        document.querySelector("label.search").classList.add("active");
        document.querySelector("label.search input").setAttribute("placeholder", "Search title...");
    });
    $inputSearch.addEventListener("blur", () => {
        document.querySelector("label.search").classList.remove("active");
        document.querySelector("label.search input").removeAttribute("placeholder");
    });
    $inputSearch.addEventListener("keydown", searchNote);

    document.querySelector("#new").addEventListener("click", createNewNote);
    document.querySelector("#new-note form").addEventListener("submit", addNote);
    document.querySelector("dialog #cancel").addEventListener("click", closeDialog);

    document.querySelector("#listView").addEventListener("click", switchToListView);
    document.querySelector("#cardView").addEventListener("click", switchToCardView);

    const notes = await get('/notes').then(res => res.json());
    await showNotes(notes);
}

async function switchToListView() {
    document.querySelector("#listView").classList.add("selected");
    document.querySelector("#cardView").classList.remove("selected");

    await showNotes(await get('/notes').then(res => res.json()));
}

async function switchToCardView() {
    document.querySelector("#cardView").classList.add("selected");
    document.querySelector("#listView").classList.remove("selected");

    await showNotes(await get('/notes').then(res => res.json()));
}

async function searchNote(e) {
    const $searchbar = document.querySelector("#input_search");
    const query = $searchbar.value;

    await get(`/notes/${query}`)
        .then(res => res.json())
        .then(data => showNotes(data));
}

async function showNotes(notes) {
    if (document.querySelector("#listView").classList.contains("selected")) {
        await showNotesInListView(notes);
    }
    else {
        await showNotesInCardView(notes);
    }
}

async function showNotesInListView(notes) {


    const $notesDiv = document.querySelector("#cards");

    $notesDiv.classList.remove("cardView");
    $notesDiv.classList.add("listView");
    $notesDiv.innerHTML = "";

    await addNotesInListView(notes);
}

async function showNotesInCardView(notes) {


    const $notesDiv = document.querySelector("#cards");

    $notesDiv.classList.add("cardView");
    $notesDiv.classList.remove("listView");
    $notesDiv.innerHTML = "";

    await addNotesInCardView(notes);
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
        .then(res => res.json())
        .then(data => showNotes(data))
        .catch(err => console.error(err));

    $title.value = "";
    $content.value = "";

    closeDialog();
}

function closeDialog() {
    const $dialog = document.querySelector("dialog#new-note");
    $dialog.close();
}

async function addNotesInListView(notes) {
    const $notesDiv = document.querySelector("#cards");
    $notesDiv.innerHTML =  `<div id=notesList></div>
                            <div id=fullNote></div>`;

    const $notesListDiv = document.querySelector("#notesList");

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

async function addNotesInCardView(notes) {
    const $notesDiv = document.querySelector("#cards");

    notes.forEach(note => {
        const card = `<div class="card">
                          <h2>${note.title}</h2>
                          <p>${note.content}</p>
                          <p class="date">${note.date.split("T")[0]}</p>
                      </div>`;

        $notesDiv.insertAdjacentHTML("beforeend", card);
    });
}
