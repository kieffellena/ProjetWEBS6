import { escapeHTML } from "../lib/escape-html.js";

function getHello(user) {
  if (user === undefined || typeof user.name !== "string") {
    return "Bonjour&nbsp;!";
  }
  return `Bonjour ${escapeHTML(user.name)}&nbsp;!`;
}

function getNav(user) {
  if (user === undefined) {
    return `
      <a href="./sign-up">S'enregistrer</a>
      <a href="./login">Se connecter</a>
    `;
  }
  return `
    <form action="./logout" method="post">
      <button>Déconnexion</button>
    </form>
  `;
}

export function get(request, response) {
  const user = request.context.user;
  response.send(`
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <title>Ma page</title>
        <link rel="stylesheet" href="./shared.css" />
      </head>
      <body>
        <main>
          <h1>${getHello(user)}</h1>
          <p>Bienvenue sur ma page.</p>
        </main>
        <nav>${getNav(user)}</nav>
      </body>
    </html>
  `);
}
