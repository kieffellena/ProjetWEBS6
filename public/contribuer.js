const form = document.querySelector("#add-rando-form");
//post la randonnee
form.addEventListener("submit", (event) => {
    event.preventDefault();

    //contribuer a une randonnee prend son nom adresse et description
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
            location.href = "/"; // à modifier pour rediriger vers la page de la randonnée ???
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

fetch('/session')
  .then(response => {
    if (!response.ok) throw new Error("Pas de session");
    return response.json();
  })
  .then(data => {
    const loginStatus = document.getElementById("login-status");

    if (data.isLoggedIn) {
      // Affiche le nom et un bouton de déconnexion
      loginStatus.innerHTML = `
        Connecté en tant que ${data.username}
        <button id="logout-btn" style="margin-left: 10px;">Se déconnecter</button>
      `;

      // Ajout du gestionnaire de clic pour déconnexion
      document.getElementById("logout-btn").addEventListener("click", () => {
        fetch('/logout', { method: 'POST' })
          .then(() => location.reload()) // Recharge la page après déconnexion
          .catch(err => console.error("Erreur de déconnexion :", err));
      });

    } else {
      // Affiche "Se connecter"
      loginStatus.innerHTML = `<a href="/connexion">Se connecter</a>`;
    }
  })
  .catch(() => {
    document.getElementById("login-status").innerHTML = `<a href="/connexion">Se connecter</a>`;
  });
  