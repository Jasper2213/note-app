"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector("#input_search").addEventListener("focus", () => {
        document.querySelector("label").classList.add("active");
    });

    document.querySelector("#input_search").addEventListener("blur", () => {
        document.querySelector("label").classList.remove("active");
    });

    document.querySelector("#new").addEventListener("click", createNewNote);

    document.querySelector("dialog #cancel").addEventListener("click", closeDialogWithoutClearingText);
}

function createNewNote() {
    const $dialog = document.querySelector("dialog#new-note");
    $dialog.showModal();
}

function closeDialogWithoutClearingText() {
    const $dialog = document.querySelector("dialog#new-note");
    $dialog.close();
}