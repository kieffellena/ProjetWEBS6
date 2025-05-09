//contient la route pour une randonee specifique

import express from 'express';

const router = express.Router();

// Page de détail dune rando
router.get('/:name', async (request, response) => {
  const db = request.context.database;
  const rando = await db.get('SELECT * FROM randonnees WHERE name = ?', request.params.name);
  if (!rando) {
    return response.status(404).send("Randonnée introuvable.");
  }

  response.send(`
    <!DOCTYPE html>
    <html lang="fr">

    <head>
      <title>Randonnée</title>
      <link rel="stylesheet" href="/randonnee.css">
    </head>

    <body>
      <header>
        <nav>
          <ul class="menu-bar">
            <li><a href="/">Accueil</a></li>
            <li><a href="/contribuer">Contribuer</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <h1>${rando.name}</h1>
        <div class="rando-sections">
          <section class="description">
            <p><strong>Description de la randonnée :</strong> ${rando.description}</p>
          </section>
          <section class="adresse">
            <div class="texte-avec-image">
              <img src="/images/panneau.png" alt="Image de panneaux de randonnées" class="image-icon">
              <p><strong>Adresse de départ :</strong></p>
            </div>
            <p> ${rando.adress}</p>
          </section>
        </div>
      </main>
    </body>

    </html>
    `);
});

export default router;