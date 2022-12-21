async function changeOrder(e) {
    e.preventDefault();

    const $select = document.querySelector("#orderBy");
    const selectedOption = $select.options[$select.selectedIndex].text;
    switch (selectedOption) {
        case "Newest":
            await orderByNewest();
            break;

        case "Oldest":
            await orderByOldest();
            break;

        case "Title ascending":
            await orderByTitleAscending();
            break;

        case "Title descending":
            await orderByTitleDescending();
            break;

        default:
            const notes = await get('/notes').then(res => res.json());
            await showNotes(notes)
            break;
    }
}

async function orderByNewest() {
    const notes = await get('/notes').then(res => res.json());

    const orderedNotes = notes.sort((a, b) => {
       return Date.parse(b.date) - Date.parse(a.date);
    });

    await showNotes(orderedNotes);
}

async function orderByOldest() {
    const notes = await get('/notes').then(res => res.json());

    const orderedNotes = notes.sort((a, b) => {
        return Date.parse(a.date) - Date.parse(b.date);
    });

    await showNotes(orderedNotes);
}

async function orderByTitleAscending() {
    const notes = await get('/notes').then(res => res.json());

    const orderedNotes = notes.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1);
    await showNotes(orderedNotes);
}

async function orderByTitleDescending() {
    const notes = await get('/notes').then(res => res.json());

    const orderedNotes = notes.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1).reverse();
    await showNotes(orderedNotes);
}
