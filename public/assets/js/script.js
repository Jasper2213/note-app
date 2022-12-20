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

    document.querySelector("#showFavourites").addEventListener("change", showOnlyFavourites);

    const notes = await get('/notes').then(res => res.json());
    await showNotes(notes);
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

async function searchNote() {
    const $searchbar = document.querySelector("#input_search");
    const query = $searchbar.value;

    await get(`/notes/${query}`)
        .then(res => res.json())
        .then(data => showNotes(data));
}

async function showOnlyFavourites(e) {
    e.preventDefault();

    const checked = e.target.checked;

    let notes = [];
    if (checked) {
        const noteIds = await get(`/favourites`)
            .then(res => res.json());

        for await (const id of noteIds) {
           const note = await get(`/note/${id}`)
                                .then(res => res.json())
                                .then(data => { return data[0]; });

           notes.push(note);
        }
    }
    else {
        notes = await get('/notes')
                        .then(res => res.json())
                        .then(data => { return data; });
    }

    await showNotes(notes);
}
