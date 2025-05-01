//contient la route pour une randonee specifique

import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const router = express.Router();

const openDb = async () => {
  return open({
    filename: './data/database.sqlite',
    driver: sqlite3.Database
  });
};

// Page de détail dune rando
router.get('/:id', async (req, res) => {
  const db = await openDb();
  const rando = await db.get('SELECT * FROM randonnees WHERE id = ?', req.params.id);
  if (!rando) return res.status(404).send("Randonnée introuvable.");
  res.render('randonnee', { rando });
});

// Page contribuer
router.get('/', (req, res) => {
  res.render('contribuer');
});

router.post('/', async (req, res) => {
  const { nom, description, depart } = req.body;
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO randonnees (nom, description, depart) VALUES (?, ?, ?)',
    [nom, description, depart]
  );
  res.redirect(`/randonnee/${result.lastID}`);
});

export default router;
