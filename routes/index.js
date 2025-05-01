//routes lies a la page d'accueil

import express from 'express';
import * as sqlite from 'sqlite';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

const router = express.Router();

// Route d'accueil
router.get('/', async (req, res) => {
  try {
    const db = await open({
      filename: path.join(process.cwd(), 'data', 'database.sqlite3'),
      driver: sqlite3.Database
    });

    const randonnees = await db.all('SELECT * FROM randonnees');
    db.close();

    if (randonnees.length === 0) {
      // Si aucune randonnee, rediriger vers contribuer.html
      res.sendFile(path.join(process.cwd(), 'public', 'accueil.html'));
    } else {
      // Si des randonnées existent 
      res.sendFile(path.join(process.cwd(), 'public', 'accueil.html')); //changer le lien
    }

  } catch (error) {
    console.error('Erreur lors de la récupération des randonnées :', error.message);
    res.status(500).send('Erreur serveur');
  }
});

export default router;

