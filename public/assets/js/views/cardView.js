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
