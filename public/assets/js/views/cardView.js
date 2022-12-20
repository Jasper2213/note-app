async function switchToCardView() {
    document.querySelector("#cardView").classList.add("selected");
    document.querySelector("#listView").classList.remove("selected");

    await showNotes(await get('/notes').then(res => res.json()));
}

async function showNotesInCardView(notes) {
    const $notesDiv = document.querySelector("#cards");

    $notesDiv.classList.add("cardView");
    $notesDiv.classList.remove("listView");
    $notesDiv.innerHTML = "";

    await addNotesInCardView(notes);
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

    addEventListenersToFavouriteAndEditIcons();
}
