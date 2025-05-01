//initialise la bdd
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'database.sqlite3');

sqlite.open({
  filename: dbPath,
  driver: sqlite3.Database,
})
  .then(async (db) => {
    // Créer la table "randonnees" si elle n'existe pas
    await db.run(`
      CREATE TABLE IF NOT EXISTS randonnees (
        name TEXT PRIMARY KEY,
        adress TEXT NOT NULL,
        note INTEGER
      );
    `);

    console.log('Tables créées avec succès (si elles n’existaient pas).');
    await db.close();
  })
  .catch((err) => {
    console.error('Erreur lors de la création des tables :', err.message);
    process.exit(1);
  });
