import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

// Définir __dirname dans un module ESM
const __filename = fileURLToPath(import.meta.url);  // Nom du fichier actuel
const __dirname = path.dirname(__filename);  // Chemin du dossier contenant ce fichier

// Fichier de la base de données
const databaseFile = './database.sqlite';
const port = 8080;

function start(database) {
  const app = express();

  // Middleware pour parser le corps des requêtes JSON et URL-encoded
  app.use(express.json());  // Permet de parser les données JSON
  app.use(express.urlencoded({ extended: true }));  // Pour les formulaires HTML

  // Middleware pour injecter la base de données dans le contexte de chaque requête
  app.use((request, response, next) => {
    request.context = request.context ?? {};
    request.context.database = database;  // Ajoute la base de données dans le contexte
    next();
  });

  // Middleware de log pour chaque requête
  app.use((request, response, next) => {
    console.log(`${request.method} ${request.url}`);
    next();
  });

  // Fichiers statiques (public/)
  app.use(express.static(path.join(__dirname, 'public')));

  // Exemple de route pour récupérer tous les utilisateurs
  app.get("/", (req, res) => {
    const db = req.context.database;
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) {
        res.status(500).send("Error accessing the database");
        return;
      }
      res.json(rows);  // Envoie la liste des utilisateurs en format JSON
    });
  });

  // Exemple de route pour ajouter un utilisateur (POST)
  app.post("/users", (req, res) => {
    const { username, password, name } = req.body;
    if (!username || !password || !name) {
      return res.status(400).send("Missing required fields");
    }

    const db = req.context.database;
    const query = `INSERT INTO users (username, password, name) VALUES (?, ?, ?)`;

    db.run(query, [username, password, name], function(err) {
      if (err) {
        return res.status(500).send("Error adding user");
      }
      res.status(201).json({ id: this.lastID, username, name });
    });
  });

  // Route pour gérer les randonnées
  app.get("/randonnees", (req, res) => {
    const db = req.context.database;
    db.all("SELECT * FROM randonnees", (err, rows) => {
      if (err) {
        return res.status(500).send("Error fetching randonnées");
      }
      res.json(rows);
    });
  });

  // Route pour ajouter une randonnée
  app.post("/randonnees", (req, res) => {
    const { name, address, note } = req.body;
    if (!name || !address) {
      return res.status(400).send("Missing required fields");
    }

    const db = req.context.database;
    const query = `INSERT INTO randonnees (name, address, note) VALUES (?, ?, ?)`;

    db.run(query, [name, address, note || 0], function(err) {
      if (err) {
        return res.status(500).send("Error adding randonnee");
      }
      res.status(201).json({ id: this.lastID, name, address, note });
    });
  });

  // Démarrage du serveur
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

// Ouvrir la base de données avant de démarrer le serveur
open({ filename: databaseFile, driver: sqlite3.Database })
  .then((db) => {
    start(db); // Passer la base de données à la fonction start
  })
  .catch((error) => {
    console.error("Error opening database", error);
    process.exit(1); // Quitter en cas d'erreur
  });
