import { open } from 'sqlite'; // Correct
import sqlite3 from 'sqlite3'; // Correct

open({ filename: './database.sqlite3', driver: sqlite3.Database })
  .then((db) => {
    return Promise.all([
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          username TEXT PRIMARY KEY,
          password TEXT NOT NULL,
          name TEXT NOT NULL
        );
      `),
      db.run(`
        CREATE TABLE IF NOT EXISTS randonnees (
          name TEXT PRIMARY KEY,
          adress TEXT NOT NULL,
          note INT
        );
      `)
    ]);
  })
  .then(() => {
    console.log('Tables created successfully (if they didn\'t already exist).');
  })
  .catch((error) => {
    console.error('Error creating database', error);
    process.exit(1);
  });
