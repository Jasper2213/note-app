async function switchToListView() {
    document.querySelector("#listView").classList.add("selected");
    document.querySelector("#cardView").classList.remove("selected");

    await showNotes(await get('/notes').then(res => res.json()));
}

async function showNotesInListView(notes) {
    const $notesDiv = document.querySelector("#cards");

    $notesDiv.classList.remove("cardView");
    $notesDiv.classList.add("listView");
    $notesDiv.innerHTML = "";

    await addNotesInListView(notes);
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

    addEventListenersToNotesInListView();
}

function addEventListenersToNotesInListView() {
    document.querySelectorAll("#notesList .note").forEach(note => {
        note.addEventListener("click", showNote);
    });
}

async function showNote(e) {
    const $fullNoteDiv = document.querySelector("#fullNote");
    const $noteDiv = e.target.closest(".note");
    const id = $noteDiv.dataset.id;

    const note = await get(`/note/${id}`)
        .then(res => res.json())
        .then(data => { return data[0]; });

    $fullNoteDiv.dataset.id = note.id;
    let fullNote = `<h2>${note.title}`;
    fullNote += await addIconsToFullNoteInListView(note);
    fullNote += `</h2>
                  <p>${note.content}</p>
                  <p class="date">${note.date.split("T")[0]}</p>`;
    $fullNoteDiv.innerHTML = fullNote;

    addEventListenersToFavouriteAndEditIcons();
}

async function addIconsToFullNoteInListView(note) {
    if (await noteIsFavourite(note.id)) {
        return `<em id="favourite" class="fa-solid fa-star"></em>
                <em id="edit" class="fa-solid fa-pen-to-square"></em>`;
    } else {
        return `<em id="favourite" class="fa-regular fa-star"></em>
                <em id="edit" class="fa-solid fa-pen-to-square"></em>`;
    }
}
