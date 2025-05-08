//routes lies a la page d'accueil
import { escapeHTML } from "../lib/escape-html.js" // faire un dossier lib dans le dossier mettre escape-html.js

export function get(request, response) {
  request.context.database.all("SELECT * FROM randonnees ORDER BY ASC")
    .then((randonnees) => {
      const contentHTML ="";

      if (randonnees.length===0){
        contentHTML=`
         <p>Il n'y a pas de randonnées pour le moment. 
          <a href="/contribuer">Contribuer ici</a>
        </p>
        `;
      }
      else{
      const randonneeListHTML = randonnees.map((r) => {
        return `
  <li>
    <a href="/randonnee/${r.id}">${escapeHTML(r.nom)}</a> - ${escapeHTML(r.depart)}
  </li>
  `;}).join("");

  contentHTML=
  `
        <ul>
          ${randonneeListHTML}
        </ul>
  `;
}

      response.send(`
        <!DOCTYPE html>
        <html lang="fr">

<head>
  <title>Accueil</title>
  <link rel="stylesheet" href="/style/shared.css">
</head>

<body>
  <nav>
    <ul class="menu-bar">
      <li><a href="/" class="actual">Accueil</a></li>
      <li><a href="/contribuer">Contribuer</a></li>
    </ul>
  </nav>

  <main>
    <h1>Les Randonnées</h1>

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