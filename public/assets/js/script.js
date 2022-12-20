"use strict";

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
        const html = `<div class="note" data-id="${note.id}">
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

    for (const note of notes) {
        let card = `<div class="card" data-id="${note.id}">
                          <h2>${note.title}</h2>
                          <p>${note.content}</p>
                          <p class="date">${note.date.split("T")[0]}</p>`;

        card = await addIconsToCard(note, card);

        $notesDiv.insertAdjacentHTML("beforeend", card);
    }

    addEventListenersToIconsInCards();
}

function addEventListenersToIconsInCards() {
    const $favourites = document.querySelectorAll("#favourite");
    $favourites.forEach($favourite => {
        $favourite.addEventListener("click", addNoteToFavourites);
    });
}

async function addIconsToCard(note, card) {
    if (await noteIsFavourite(note.id)) {
        card += `<div id="icons">
                    <em id="favourite" class="fa-solid fa-star"></em>
                    <em id="edit" class="fa-solid fa-pen-to-square"></em>
                 </div></div>`;
    } else {
        card += `<div id="icons">
                    <em id="favourite" class="fa-regular fa-star"></em>
                    <em id="edit" class="fa-solid fa-pen-to-square"></em>
                 </div></div>`;
    }
    return card;
}

async function noteIsFavourite(id) {
    const favourites = await get('/favourites')
        .then(res => res.json());

    return favourites.includes(id);
}

async function addNoteToFavourites(e) {
    const note = e.target.closest("div.card");
    const id = note.dataset.id;

    let notes;

    if (e.target.classList.contains("fa-solid")) {
        notes = await remove(`/notes/favourites/${id}`)
                        .then(res => res.json())
                        .then(data => { return data; });
    }
    else {
        notes = await post(`/notes/favourites/${id}`)
                        .then(res => res.json())
                        .then(data => { return data; });
    }

    await showNotes(notes);
}
