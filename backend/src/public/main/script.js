
import * as database from "../scripts/database.js";

const modal = document.getElementById("new-brand-modal");
const openButton = document.getElementById("add-brand-button");
const closeButton = document.getElementById("new-brand-modal-close-button");

openButton.onclick = function() {
    modal.style.display = "block";

    try {
        console.log("Creating brand via api.");

        // TODO: Delete this later.
        // This is only for testing purposes.
        database.createBrand({
            name: "Something2",
            category: "Device",
        });
    } catch (error) {
        console.log(error);
    }
}

closeButton.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal)
        modal.style.display = "none";
}
