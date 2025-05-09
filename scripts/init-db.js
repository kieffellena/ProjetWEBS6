//initialise la bdd
import sqlite3 from "sqlite3";
import { open } from "sqlite";

open({ filename: "./database.sqlite", driver: sqlite3.Database })
  .then((db) => {
    return db.prepare(`
    CREATE TABLE IF NOT EXISTS randonnees (
      name TEXT PRIMARY KEY,
      adress TEXT NOT NULL,
      description TEXT NOT NULL,
      note INTEGER CHECK(note BETWEEN 1 AND 5)
    );
  `);
  })
  .then((statement) => statement.run())
  .catch((error) => {
    console.error('Erreur lors de la création des tables :', error);
  })

