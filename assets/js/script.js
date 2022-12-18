"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector("#input_search").addEventListener("focus", () => {
        document.querySelector("label").classList.add("active");
    });

    document.querySelector("#input_search").addEventListener("blur", () => {
        document.querySelector("label").classList.remove("active");
    });
}