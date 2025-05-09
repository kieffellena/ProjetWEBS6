const form = document.querySelector("#add-rando-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.elements.name.value;
    const adress = form.elements.adress.value;
    const description = form.elements.description.value;

    fetch("./contribuer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, adress, description }),
    }).then((response) => {
        form.querySelectorAll(".error").forEach((element) => {
            element.classList.remove("enabled");
        });
        if (response.ok) {
            location.href = "/"; // à modifier pour rediriger vers la page de la randonnée
        } else if (response.status === 409) {
            form.querySelector("#name-exists-error").classList.add("enabled");
        } else {
            form.querySelector("#add-error").classList.add("enabled");
        }
    },
        () => {
            form.querySelector("#add-error").classList.add("enabled");
        }
    );
});