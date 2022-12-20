async function showNotes(notes) {
    if (document.querySelector("#listView").classList.contains("selected")) {
        await showNotesInListView(notes);
    }
    else {
        await showNotesInCardView(notes);
    }
}

function addEventListenersToFavouriteAndEditIcons() {
    const $favourites = document.querySelectorAll("#favourite");
    $favourites.forEach($favourite => {
        $favourite.addEventListener("click", addNoteToFavourites);
    });
}

async function noteIsFavourite(id) {
    const favourites = await get('/favourites')
        .then(res => res.json());

    return favourites.includes(id);
}

async function addNoteToFavourites(e) {
    let note;
    if (document.querySelector("#cards").classList.contains("cardView")) {
        note = e.target.closest("div.card");
    }
    else {
        note = document.querySelector("#fullNote");
    }

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
