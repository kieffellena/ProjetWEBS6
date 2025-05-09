import sqlite3 from "sqlite3";
import { open } from "sqlite";

open({ filename: "./database.sqlite", driver: sqlite3.Database })
  .then(async (db) => {
    // creation de la table randonnees
    const stmt1 = await db.prepare(`
      CREATE TABLE IF NOT EXISTS randonnees (
        name TEXT PRIMARY KEY,
        adress TEXT NOT NULL,
        description TEXT NOT NULL,
        note INTEGER CHECK(note BETWEEN 1 AND 5),
        photo TEXT
      );
    `);
    await stmt1.run();

    //creation table users
    const stmt2 = await db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY,
        password TEXT NOT NULL
      );
    `);
    await stmt2.run();
  })

  .catch((error) => {
    console.error("Erreur lors de la création des tables :", error);
  });
