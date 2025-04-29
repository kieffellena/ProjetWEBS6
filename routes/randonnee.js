// routes/randonnees.js
import express from 'express';
import { createRandonnee } from '../shared/models/randonneeModel.js';

const router = express.Router();

// Route POST pour ajouter une nouvelle randonnée
router.post('/', async (req, res) => {
  const { name, description, address } = req.body;
  try {
    const newRandonnee = await createRandonnee(name, description, address);
    res.status(201).json(newRandonnee);
  } catch (error) {
    console.error("Error adding randonnee:", error);
    res.status(500).send("Erreur lors de l'ajout de la randonnée.");
  }
});

export default router;
