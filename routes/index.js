//routes lies a la page d'accueil
import { escapeHTML } from "../lib/escape-html.js"

export function get(request, response) {
  request.context.database.all("SELECT * FROM randonnees ORDER BY name")
    .then((randonnees) => {
      let contentHTML = "";

      if (randonnees.length === 0) {
        contentHTML = `
         <p>Il n'y a pas de randonnées pour le moment. 
          <a href="/contribuer">Contribuer ici</a>
        </p>
        `;
      }
      else {
        const randonneeListHTML = randonnees.map((r) => {
          return `
          <li>
            ${escapeHTML(r.name)} - ${escapeHTML(r.adress)} - <a href="/randonnee/${encodeURIComponent(r.name)}">Chemin vers la randonnée</a>
          </li>  
          `;
        }).join("");

        contentHTML = `
          <ul class="rando-list">
           ${randonneeListHTML}
          </ul>
        `;
      }

      response.send(`
        <!DOCTYPE html>
        <html lang="fr">
          <head>
            <title>Accueil</title>
            <link rel="stylesheet" href="./accueil.css">
          </head>

          <body>
            <header>
              <nav>
                <ul class="menu-bar">
                  <li><a href="/" class="actual">Accueil</a></li>
                  <li><a href="/contribuer">Contribuer</a></li>
                </ul>
              </nav>
            </header>
            <main class="center">
              <div class="texte-avec-image">
                <img src="/images/randonnee.png" alt="Image de randonneur" class="image-icon">
                <h1>Les Randonnées</h1>
              </div>
              ${contentHTML}
            </main>
          </body>
        </html>
        `)
    }
    )

    .catch((error) => {
      console.error('Erreur lors de la récupération des randonnées :', error);
      response.status(500).send('Erreur serveur');
    })
}