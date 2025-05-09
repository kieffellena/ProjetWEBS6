const form = document.querySelector("#connexion-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = form.elements.username.value;
  const password = form.elements.password.value;
  const createUser = form.elements.createUser.checked;

  fetch("./login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, createUser }),
  }).then(
    (response) => {
      // Cacher toutes les erreurs
      form.querySelectorAll(".error").forEach((element) => {
        element.classList.remove("enabled");
      });

      if (response.ok) {
        location.href = "/";
      } else if (response.status === 401) {
        document.querySelector("#connexion-error").classList.add("enabled");
      } else if (response.status === 409) {
        document.querySelector("#username-exists-error").classList.add("enabled");
      } else {
        // erreur serveur générique
        alert("Erreur serveur, veuillez réessayer plus tard.");
      }
    },
    () => {
      alert("Erreur réseau, impossible de contacter le serveur.");
    },
  );
});
