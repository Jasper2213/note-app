const lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores excepturi iusto minima nisi nulla quas veniam. Cumque ex, hic incidunt ipsa, mollitia nobis nostrum, officiis rerum sed similique sit tenetur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci assumenda, culpa ea eligendi eos fugiat hic iste iure maxime minima modi molestiae nisi omnis perspiciatis porro quae quasi tempora voluptatibus.";

let notes = [
    {
        id: 1,
        title: "New note",
        content: lorem,
        date: new Date(2022, 1, 22)
    },
    {
        id: 2,
        title: "New note (1)",
        content: lorem,
        date: new Date(2021, 12, 25)
    }
];

let favourites = [];

export { notes, favourites };
