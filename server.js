import http from "node:http";
import { accueil } from "./pages/accueil.js";
import { rando } from "./pages/randonnee.js";
import { contribuer } from "./pages/contribuer.js";

//creation du serveur
let server = http.createServer((request, response) => {
  console.log("Une requete a ete recue !");

  if (request.url === "/") {
    response.end(accueil());
  }
  else if (request.url === "/contribuer") {
    response.end(contribuer());
  }
  else {
    response.end(rando());
  }
});

server.listen(8080, "localhost"); //ecoute sur le serveur 8080

// ecrire npm run start et aller sur ce lien pr tester  http://localhost:8080
// si tu veux changer de page que la page d'accueil
// tu vas dans le lien et tecris par ex  http://localhost:8080/contribuer
