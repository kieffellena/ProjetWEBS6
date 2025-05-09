document.addEventListener("DOMContentLoaded", () => {
    const select = document.querySelector("#tri-nom");
    const list = document.querySelector(".rando-list");

    select.addEventListener("change", () => {
        const items = Array.from(list.querySelectorAll(".rando-item"));
        const order = select.value;

        items.sort((a, b) => {
            const nameA = a.dataset.name;
            const nameB = b.dataset.name;
            return order === "asc"
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
        });

        items.forEach((item) => list.appendChild(item));
    });
});
